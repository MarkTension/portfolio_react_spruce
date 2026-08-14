# Microcosmos: evolving swimmers in a differentiable fluid

We released Microcosmos, a GPU artificial life platform where creatures are elastic filaments swimming in a viscous fluid. It's work I did for the ALife Institute together with Ciaran Regan, Bert Wang-Chak Chan, Mizuki Oka, Kenneth O. Stanley and [Grisha Szep](https://gszep.com/en/). The real blogpost with interactive demo, and videos is on the Artificial Life Institute website:

**[Read the full release post at the ALife Institute →](https://alife.institute/en/blog/microcosmos-release/)**

- Paper: [arxiv.org/abs/2607.02954](https://arxiv.org/abs/2607.02954v1)
- Code: [github.com/alife-institute/microcosmos](https://github.com/alife-institute/microcosmos)
- Supplementary videos: [alife.institute/microcosmos-supp](https://alife.institute/microcosmos-supp/)

Here's some personal context on it.

## The gap it tries to close

In [my reflections on the ALife 2025 conference](/blog/alife-25-conference-reflections) I wrote that the field tends to split into two camps. On one side you have abstract rule-based systems: cellular automata, Lenia, Boids. They're cheap, they scale, and you can search enormous spaces of them. On the other side you have physically-grounded simulators that are honest about their mechanics but so expensive that running evolution on top of them is out of reach.

Microcosmos is an attempt at the middle. Real physics, but arranged so the compute stays linear.

## The process

The trick was going for methods with local rules while adhering to physics rules (conservation of momentum etc).
Instead of buffer lookups, we write forces to the texture (stigmergy). Exactly like my earlier work written about in [An Order of Magnitude more boids](/blog/order-of-magnitude-boids), where boids wrote normalized velocity vlues to texture, which could get cheaply read out by other boids, thereby avoiding a read from the global boid buffer. The steric force used in Microcosmos is using this to avoid getting the exact collisions.

Also the same methods of local linked lists and bending rules was inspired by earlier work: [The actin locomotion project with Grisha](/blog/cell-locomotion-through-actin-polymerization). There we made these long polymers, modeled as  monomers with variables pointing to the address of their direct neighbors.

The breakthrough was going for Cosserat rods for bending instead of standard [PBD positional bending rules](https://mmacklin.com/2017-EG-CourseNotes.pdf). Positions are less stable. Particles could get too close to another, which could yield huge errors between target angle and the current state. Especially wrt differentiability it yields much cleaner results.

## Why I care about this research

Two reasons, both of which have been on my mind for a couple of years.

First is scale. Most of what I find beautiful in artificial life only shows up when you can run a lot of it. When things start to look really organic and complex. 

The second is that it looks like something. I've argued before that ALife research deserves to be [taken to its visual limit](/blog/alife-25-conference-reflections), that the field would get more attention and funding if papers came with more footage that made people feel the strangeness of what they were watching. There's an interactive WebGPU demo in the browser too, which is a nice illustration. 

And honestly, while it looks very cool imo, with the water flow and actual swimminng dynamics etc., I think we just showed the _tool_ and its capabilities, but next step is to apply it and get some unexpected results.

Anyway, [please read the actual post](https://alife.institute/en/blog/microcosmos-release/), it has the videos and interactive demo as well.
