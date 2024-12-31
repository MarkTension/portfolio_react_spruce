**# Neural Cellular Automata and Swarming

Here's some documentation on my endeavors with putting [Neural Cellular Automata (NCA)](https://distill.pub/2020/growing-ca/) into a flock of BOIDS. Why? 
- Artistic purposes
- Understand NCA more intimately
- Since NCA is quite robust to noise, I want to see how far this can be pushed
- It might help with coming up with new project ideas. 

<p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/BYt77BIho1E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

So how does it work? I started with my standard flocking code. 
Then added a new buffer containing for each boid the 4-number state, which is also each boids' color.

Normally NCA updates each pixel/state by looking at that of the 8 neighboring pixels. 
It's less straightforward for a dynamic system like BOIDS. We'll have to approximate what the neighbors are by looking at each direction around it. Then we take the closest boid in each direction. 

Here's part of the WGSL code to understand it in a bit more detail.

```HLSL
let diff = other.position - posotion;
let high = 99999.9;
let start = vec4f(0.01)
var neighborDistances = array<f32, 8>(high, high, high, high, high, high, high, high);
var neighborCaStates = array<vec4f, 8>(start, start, start, start, start, start, start, start);

if (dist < uniforms.detectionRange) {
  let angle = atan2(diff.y, diff.x);
  // get int (topleft=0, top=1, etc bottomRight=8) representing the direction
  let direction = classify_position(angle, v);

  if (direction != -1) {
    let curSmallestDist = neighborDistances[direction];
    if (dist < curSmallestDist) {
      neighborCaStates[direction] = agents[i].caState;
      neighborDistances[direction] = dist;
    }
  }
```

So for the NCA update rule implementation I used [this example](https://www.shadertoy.com/view/slGGzD) from shadertoy and adapted it to my WGSL code. For a long while I thought it didn't work, but after long painful night of debugging it turned out I wrote a row-major order vs column-major order matrix multiplication.

### Reflections
I'm quite happy on how it turned out (see video above), and I have some more ideas on how to improve it.
Also less difficult than I thought it'd be with all the examples and documentation available. Honestly, most time went into scaling it up by implementing tiling and figuring out how to get radix sort to work.

Also, it turns out NCA robustness to noise works well, because the patterns are undeniably similar to the original while it's far from exact what the boid's neighbor is.

Then one more trick you can do is, when determining the neigbors, take the neighbors based on the BOID's direction instead of the absolute neighbor. This works quite well too. Some of the parts of the video have this, and it results in effects less true to how the patterns are trained, but cool in another way.

Also what gave some interesting effects is letting the colors affect the boid's steering parameters. This gives a super cool interplay, never fully stabilizing a pattern.**