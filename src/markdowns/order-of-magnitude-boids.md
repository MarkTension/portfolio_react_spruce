# An Order of Magnitude More Boids: Optimizing Flocking Simulations

<p align="center">
<img width= "40%" src="/images/blogHeaders/webgpu_result.webp" alt="ld image">
</p>

Here's some new results simulating an order of magnitude more boids, while keeping global interactivity accross the canvas. I'll share more what that means in this article, and how it's done, but here's a preview.

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/hHjXNewxjiw?si=3iYLUz9nkSP1XK38" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

The boids algorithm is a classic agent-based system in artificial life and computer graphics / game development.
It was first developed by Craig Reynolds in 1986, and it models each agent with basic behavioral rules, which together make a bird-flocking behavior emerge.
The rules are

- cohesion: boids gravitate towards each other to flock together
- separation: boids keep a certain distance from another to avoid collision
- direction: boids move in the same direction.

I read first about this in [The Nature Of Code](https://natureofcode.com/autonomous-agents/), which gives good code examples.
Anyway, it's the perfect example of an emergent system: Complex dynamics emerge from simple rules.

NOTE: In this article I will use the words boids, agents and particles interchangeably. They mean the same thing in different levels of specification: A boid is an instance of an agent and an agent is an instance of a particle.

### Optimizing boid performance

My interest in GPU programming started with [a course in compute shaders](https://arsiliath.gumroad.com/l/compute-shaders) by Arsiliath. Here we also learned to model boids on GPU kernels, and explored ways to get from O(n^2) (each boid iterating over all other boids in the system). I was really intrigued with the artisitc potential of it, but wanted to model more agents. People adviced me to work with tiling.

<p align="center">
<img width= "30%" src="/images/fig_n2.webp" alt="ld image">
<img width= "30%" src="/images/fig_tiling.webp" alt="ld image">
Figure 1. Left: brute-force boid algorithm. For each boid look up all other boids. Right: Tiling approach. Within each tile, lookup each other boid.
</p>

### Tiling

Tiling allows you to avoid checking all n boids for interactions, reducing the number of comparisons. For example, if the texture is divided into m tiles, and each tile contains k particles, interactions are reduced to O(k × m) checks.

I ended up finding this [excellent blogpost by Wicked Engine](https://wickedengine.net/2018/05/scalabe-gpu-fluid-simulation/) on how to implement tiling for fluid systems. The author implemented the dynamic hashed grid algorithm. It needed a Bitonic Merge Sort Algorithm for sorting, and I learned a ton implementing it in Unity. Ended up simulating around 250k boids with it on my M1 macbook, and created some videos I was quite happy with.

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/mYCRJbejYu4?si=HqO5ImRVmm_CYQxA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

### Limitation of tiling - you lose global dynamics

However, there are limitations when usig tiling. The more boids you want to simulate, the more tiles you need to use in one texture. The more tiles you use, the less boids on one side of the texture will be influenced by boids on the other side of the texture. In other words, the tiling destroys the global dynamics of the system, and limiting the visualization to local interactions. Fr boids this results in thousands of swarms, instead of a couple of huge swarms.

Some hackers take it so far that they use tiling to model [4 million boids](https://www.reddit.com/r/Unity3D/comments/y9lla6/4_million_flocking_boids_using_compute_shaders/) or even [16 million boids](https://www.reddit.com/r/Unity2D/comments/y9lphe/16_million_flocking_boids_using_compute_shaders/). Granted, especially the 3D 4 million boids looks really cool because it is immersive. But when in 2D, especially the 16 million one, you see only flocking on a very small scale; you have to zoom in to see flocks. If you zoom out, it is like you watch the stars, and the iconic boids flocking look is gone. Though technically impressive, for artistic works, this way of amplifying boid numbers defeats the purpose.

### On what makes interesting pictures

There are many reasons why some images are interesting and some are not.

- One main important one is that it must feel that there's a lead (like lead in music). That there's one main thing happening. Not that it's all one homogenous texture, but that some shapes for instance are quite big.
- But also i like the image to follow fractal patterns: on the highest/global scale of the texture, you see a distinct phenomenon, e.g. one half looks different than the other half, and also on lower scales you see other distinct phenomena. I wrote about this in my blogpost [Quantifying interestingness in images using informationtheory](https://marktension.nl/#/blog/Quantifying%20interestingness%20in%20images%20using%20information%20theory). The idea comes down to when you blur a texture on different resolution, ideally you see different images for each resolution. Practically it means that you have bigger (lead) behaviors to pay attention to, but also smaller behaviors for instance that they're composed of. This is something I'm aiming for when creating these systems.

The purpose of using way more boids is that the whole thing looks smoother, more organic, and in a way richer. Adding variations of boid species that operate on different scales or with different parameters would be a way to achieve these effects.

<p align="center">
<img width= "30%" src="/images/fig_stigmergy.webp" alt="ld image">
Figure 2. An illustration of Stigmergy, used in physarum. 
</p>

### Solution: Use Stigmergy

Instead of giving boids access to a list/buffer of the other boids, you can also give them access to the texture to indirectly detect other boids via their sensors and texture deposits.

This is much akin to how physarum (a slime-mold often used in simulations to generate beautiful graphics) works. Physarum, and also ants, use a process called stigmergy for directing their behavior. This [beautiful work and write-up](https://cargocollective.com/sagejenson/physarum) of Sage Jenson is worth reading and checking out.
It comes down to giving each particle a couple of sensors, and letting them dispose pheromone trails on the texture. They pick up pheromone trails that are deposited on the texture by other particles and steer based on the texture readouts. For example, on detection of e.g. a pheromone trail on the left sensor of a particle, it can change its velocity into that direction. These particles don't have to look up all other particles, but just read out the amount of sensors they have, which is most often 3. This results in a Big O(3n): 3 senors, and n particles.

On a technical implementation level, you'd often use a separate texture for the pheromone deposits, and you'll diffuse the deposits so they spread out accross the texture so particles can chase the gradient.

This allows you to model millions of particles while retaining global dynamics in a simulation. It can still be global because you can set the distance of the sensors without affecting the number of lookups.

### Adapting stigmergy to boids

Physarum is more straightforward, because agents just steer into the pheromone trails. For boids, this already takes care of the Cohesion part of its behavior.

But how to model Separation and Direction? We can add different sensor types! That way we have e.g. 3 \* 3 sensors: 3 for cohesion, 3 for separation, and 3 for direction. But an important technical detail: Each sensor needs a different distance from the boid.
The separation sensors should be set closer to the agent than the cohesion and direction sensors; separation is only necessary for boids not to collide in close proximities.
The cohesion and direction sensors can share the same location, but don't have to. But biologically speaking, it is more logical that they care first about getting into the flock before carring about the direction the flock is going. Thereofre I'd set direction a little closer to the boid than the cohesion, but it doesn't matter much from what I've observed in my experiments.

I used 2 separate pheromone textures, because the direction deposits are 2d (x and y velocities), and cannot mix with the other 1d pheromones. Also I didn't only use 3 sensors per sensor types. The higher you go, the more boid-like the behavior becomes. 5 is a good sweet spot.

<p align="center">
<img width= "30%" src="/images/fig_boid_stigmergy.webp" alt="ld image">
Figure 3. An illustration of Stigmergy, used for boids. 
</p>

Here's a debug screenshot where I didn't use 3 sensors per sensor-type, but drew a square of sensors around each boid (except opposite to the direction it's going, (which I did before and resulted in them moving in circles))

<p align="center">
<img width= "30%" src="/images/fig_sensor_debug.webp" alt="ld image">
Figure 4. A debug screenshot of the boids with sensors visualized.
</p>

### Result of the Stigmergy-based boids

Overall I'm super happy with the results. I implemented it in WebGPU, and it works great! You retain global dynamics, and can easily model > 3M boids on my M1 macbook running on > 90fps.
Here's a video that's also audio-reactive (so it runs on realtime)

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/hs5fIaVELyQ?si=TLG_o6V2HUhvTJJB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>

And a more experimental one that also has some parameter changes that make it like physarum sometimes (dialing down the strength of separation and direction).

<p align="center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/wS9MUy14VUU?si=-OJkKi9TR82elzlT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</p>
