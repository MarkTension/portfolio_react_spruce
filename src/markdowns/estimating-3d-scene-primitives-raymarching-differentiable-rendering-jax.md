# Estimating 3D Scene Primitives with Raymarching and Differentiable Rendering in JAX

<p align="center">
<img width= "40%" src="/images/blogHeaders/prims2_sq.webp" alt="ld image">
</p>

At hypothetic we had a series of R&D projects focussing on providing tools for the 3D asset creation pipeline.

One of these projects was on differentiable volume rendering.
We didn't build it into any of our products after we put more focus on our core asset-management product, but it's an interesting topic nonetheless, and holds much potential.

### Background

This project started when reading an interesting blogpost called [Simple 3D visualization with JAX raycasting](https://google-research.github.io/self-organising-systems/2022/jax-raycast/) by Alexander Mordvintsev. I've been a fan of Mordvintsev's work, and was especially interested in this post because of my interest in volumentric rendering, since many of my personal compute-shader projects are 2D, and could be cool to take into 3D using such methods.

In the post, Mordvintsev explains how to use raycasting for rendering Signed Distance Fields (SDFs). He makes a 3D scene with a set of spheres in space by specifying their center coordinates and radius, and then goes on to render it using raycasting with the JAX library. You even learn about shadows, how to estimate normals, and other cool rendering basics. It's a smart and elegant implementation. Definitely read that article first if interested in this topic, since it explains it well on the JAX code level with good examples.

Beyond its visualization potential however, I loved the fact that it was in JAX, and therefore also elegible for passing gradients through the functions, making it possible to do differentiable rendering!

### Technical story - SDF

First a little background on SDFs. An SDF is a 3D data representation. It is basically a grid (be it 2D or 3D) of floating point values that describes a scene. A negative value (sign) means it's inside the object, and positive means outside. The further away you go from the boundary of the object in the scene, the higher the absolute value becomes. The boundary is implicitly defined as where the cells are 0.

But the boundary can be arbitrarily set for the renderer to be any value (this is the ISO value), which allows you to either shrink or grow the volume. Also the fact that the values are continuous allows taking the gradient, making it suitable 3D representation for differentiable rendering.

The scene from Mordvintsev's article, described by a list of spheres with radius and center coordinate `list[Sphere2D(r, x, y)]` can be easily converted into this grid by sampling each cell in the grid, and calculating how far the cell is from the nearest boundary. Here's some pseudo-code

```python
for x, y in grid:
    for sphere in sphere_list:
        distances.append(distance((x, y), sphere_boundary))
    SDF[x,y] = min(distances)
```

### Technical story - How to automate primitive generation?

So what can we do with differentiable rendering? And how do we do it?
Say you have a 3D scene that you want to have a low-poly estimate of that using primitives.

You can hand-model it in blender with primitive shapes, but you can automate it with differentiable rendering and the technique I'm about to describe in the following steps:

1.  Generate a random scene using a list of primitives (in our case just spheres). I'll call this the **State**. Note that other primitives are also possible and fun to try. See [this post with a list of implementations by Inigo Quilez](https://iquilezles.org/articles/distfunctions/)

2.  Make the **State** renderable and comparable to the target by converting it into an SDFs array (As in the pseudo-code above).

3.  If not already, put the **Target** scene into an SDF representation using any open-source mesh-to-sdf tool. I like [mesh2sdf](https://github.com/wang-ps/mesh2sdf). Make sure both are the the same resolution.

4.  Since we have the **Target** and **State** in the same representation, we can frame this as an optimization problem! To optimize we'll need a loss function first, and that's easy now. Because we can quanitify how different they are with e.g. a euclidean distance, or MSE between them.

5.  Optimization. What are the 'parameters' that we optimize? In neural networks those are the weights of the model. In our case, we can optimize the sphere's center and radius values. The gradients need to be traced through the 2 functions (distance-function & primitive-to-sdf-function).

6.  Now just follows an iterative application of gradient descent onto the primitive values, decreasing the distance between state and target until we like the result enough!

7.  For visualizing the (intermediate) results we render with raycasting.

Note that for point 7 you can take it further by doing the comparison on the image/render level. Technically that'd be _actual_ differentiable _rendering_, since it's optimizing through the rendering layer. We've experimented with that as well, and it's slower since we have the extra raycasting function to gradient-descent through. But also it's less precise, because you cannot see everything through the render, even if you render and compare multiple viewpoints. For the current project it was simply not necessary. Nonetheless this is interesting to mention, because comparing on the image level gives freedom to do some extra fun stuff. It allows you to take targets that are not 3D but just images, or even text descriptions that can be embedded with CLIP as well as the render result, like in the great article by David Ha called [Modern Evolution Strategies for Creativity: Fitting Concrete Images and Abstract Concepts](https://es-clip.github.io/).

In the future I might try and hook up CLIP to to steer optimization with text, but not counting on clip providing enough guidance on these geometric displacements to converge to anything worthwile.

### Extra implementation details

There were some important details to mention which were necessary to make the optimization work better.
The loss was not only the MSE between arrays, but had a little more to it.

The loss _loss_clipped_ was used, which clipped the absolute of all SDF values to 0.01.
This makes the optimization focus on the boundaries of the objects, which we're interested in, instead of matching the exact SDF values inside or outside the objects. This is also important because the target SDF in our case had a slightly different range, which results in artifacts if not either normalized or clipped.

```
    loss_clipped = mse(clip(state, 0.01), clip(target, 0.01))
    loss = loss_clipped + loss_target_missing
```

`loss_target_missing` is an extra term for prettier output. It penalizes areas where there should be target mass, but isn't any, thereby pushing optimization into a slightly more aesthetic result, with bigger, overlapping primitives, instead of small primitives that are not connected.

### Results

<p align="center">
<img width= "90%" src="/images/primitives_comp.webp" alt="ld image">
Figure 1. results after optimization with different numbers of spheres. [8, 16, 32, 64, 128, 256]. It's cool to see the details decrease with fewer spheres, making it more and more into some abstract interpretation of the original.
</p>
<p  align="center">
<img width= "20%" src="/images/primitives_fer_gif.gif" alt="ld image">
<img width= "20%" src="/images/primitives_fer_target.webp" alt="ld image">
Figure 2. optimization over time. SDF Target Ferengi on the right
</p>

### Some thoughts

I enjoyed developing in JAX. Never wrote anything in it before, but the functional programming approach (though frustrating at first) in the end helped thinking about the flow of data, maybe because it's easier to write everything down on paper with functions.

Also it was educational read and work with the code provided by Mordvintsev's blog article. It teached me some deeper insights into the fundamentals of rendering, like how to setup a basic renderer from scratch, shadows, how to estimate normals, and morphing SDF volumes into eachother.
