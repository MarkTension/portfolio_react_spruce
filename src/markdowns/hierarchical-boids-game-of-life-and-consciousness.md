# Hierarchical BOIDS, Game of Life, recursion and a model for consciousness?

<p align="center">
<img width= "40%" src="/images/blogHeaders/kubok.webp" alt="kuboktaeder">
</p>

This post explores a research idea that's been on my mind. It continues on my earlier research on [how to simulate an order of magnitude more boids](https://marktension.nl/blog/order-of-magnitude-boids/), but it's less practical, more theoretical and more philosophical. I'll propose a computational model based on how increased complexity and open-endedness can arise from local rules and a recursive function. If you're familiar with it, you might notice I'm reading a lot of Gödel Esscher Bach lately, which was a huge inspiration for this. [Craig Reynold's BOIDS](https://cs.stanford.edu/people/eroberts/courses/soco/projects/2008-09/modeling-natural-systems/boids.html) (simulated bird flocking) is used to examplify it, and I'll extend it to a more profound example on [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). At the end I'll also give my own hot take on consciousness relating to this theory.

### Hierarchy in programming languages - and a tangent on Erlang
It all started during a conversation with my Escher Think co-founder Bas on hierarchy in information systems and programming languages. 

Specifically, we talked about hierarchy in the Erlang programming language (which recently gained more attention since Whatsapp was built on it). He shared that it consists of many concurrent, isolated processes that don't share state, but instead pass messages to another. 

In Erlang, a processes can either be a worker or supervisor. A program has many processes and is organized hieararchically like a tree. The tree consist of sets of processes overseen by supervisors, which can in turn be overseen by higher level supervisors. That way workers can send messages up to supervisors, which can in turn have a process supervising them as well. 

I like how this hierarchy combined with local rules (messages) is analogous to how cognition in biology works as well, with mechanisms like predicitive coding, Carl Friston's [Free Energy principle](https://en.wikipedia.org/wiki/Free_energy_principle) and e.g. the visual pathway in the brain.

### Taking swarms to the next level
Now to BOIDS. During the conversation I started thinking of an artificial life question I've been pondering.

Artificial life is so interesting because phenomena emerge from agents following local rules (like in Erlang's isolated concurrent processes). Yet I've never seen a BOID simulation get to the 'next level of complexity'. You can tweak the rules and starting state a lot to change their behavior, but it won't give an objective to the flock itself. In other words, the flock does not suddenly become an agent, and follow its own set of rules.

For that you'll have to implement a higher level process to give agency to a flock. Let's park this for now though.

### Turing complete != intelligent
I'm not saying BOIDS are necessarilly capable of higher level processes beyond swarming. But it's an intuitive emergent system to talk about, and as you'll later see a perfect simple example. 

Another system which _is_ capable of computation is Cellular Automata (CA). Steven Wolfram's work is relevant here. He researched CA systems (different rule-sets) which can give emergence to compute. Especially significant is his system called [rule 110](https://en.wikipedia.org/wiki/Rule_110), which is turing complete. Same can be said about the famous Conway's Game of Life, which is also a form of CA and turing complete. These systems are can be 'taken to the next level' indefinitely.

So how is a 2D grid with rules turing complete? It allows building the components that are necessary for computation, like logic gates. [Here's a tutorial](https://www.nicolasloizeau.com/gol-computer) on how to build a computer with Game of Life. You build it by arranging it to form various logic gates, and abstract on them to build more complex processses.

Nevertheless, despite having a system that _can_ be turing complete, who's going to build the computer with it? Albeit interesting for many reasons, having an outsider intelligent system (the human) to build the computer is kind of a hack. It shows that it is compute-capable, but doesn't show how logic gates could evolve by themselves. Letting complexity be built by an outsider is more an argument for intelligent design. The interesting question to me is: **How does the system bootstrap itself, so that the next level of complexity can give rise to a higher level of complexity**? The higher level needs to receive an abstraction of lower-level phenomena (like Conway's logic gates) instead of only the low-detail phenomena itself. That would empower it to reach its own higher level objective. And the word _objective_ is key here as well. An objective needs to emerge. In other words: It needs agency, just like how humans have agency.

A not so unrelated study that kind of answers that is that self-replication, and no other objective functions are necessary for the emergence of more intelligent systems. [Computational Life: How well formed, Self-replicating programs emerge from simple interactions.](https://arxiv.org/abs/2406.19108). However, 

### Formalizing the system
Having a system that self-organizes by forming increasingly complex layers on top of eachother is the goal. Let's put it into 1 function. That would please Occam's Razor.

It's still a bit vague, so let's look at the concrete BOIDS system.

    [Separation, cohesion & alignment]

These are the rules of the BOIDS universe. Supreme flocking behavior. (The real universe likely has other rules: e.g. increasing kolmogorov complexity / [criticality](https://en.wikipedia.org/wiki/Self-organized_criticality) / homeostasis?)

To make it recursive:
The core idea is that the flock becomes a new BOID; The flock gets BOID behavior.
On the flock level, it does not care about BOIDS below, but instead about other flocks on its own level.

So the rules can be the exact same as lower level boids'! [Separation, cohesion & alignment] to form flocks of flocks.
This can be repeated indefinitely. It's a strange-loop!

### How does the swarm attain agency
The core question is: How does the swarm attain this agency?

In this system, each layer should give rise to the next. For BOIDS you can do that by generating high-level BOIDS together with the current level BOIDS. High level boids are invisible, don't actualize until they detect and hook into a local manifestation of the emergent property, in this case flocking. The attachment of a high level BOID onto the flock is the emergence of agency. 

When attached it must stay centered in the flock. He will steer based on the position of other activated high-level BOIDS. He does therefore not need to listen directly to the lower level anymore. It will need to manipulate the lower level BOIDS swarm to steer. Likely it'd have to be weaker signals directly to those BOIDS to nudge the flock in the right direction.

So let's write this in the much anticipated recursive function.
We'll need to account for the perception range (which needs to grows increasingly large), and adding less boids each higher layer.

~~~python
def manifest(l0_boids, l1_boids, range):
    steer(l0_boids, range)
    l1_boids_actualized = detect_flocking(l1_boids, range)
    if l1_boids_actualized:
        manifest(l1_boids_actualized, create(l2_boids, num=len(l0_boids)/10), range+1)
~~~

Something like this could get written on a shader with some tricks, hacks and limits, but even better would be to use something like JAX, because it also runs on the GPU and is functional (which would be a better match for the recursive function).

### A more general recursive function
A more general version than BOIDS would look something like this. 

```python
def manifest(l0_x, l1_x, range):
    behave(l0_x, range)
    l1_x_actualized = detect_local_emergence(l1_x, range)
    if l1_x_actualized:
        manifest(l1_x_actualized, create(l2_x), range+1)
```

### Stepping up: Hierarchical Cellular Automata

It could be interesting to explore how this paradigm can be applied to other systems as well. Game of Life or CA might be suitable for this to, albeit more difficult, since those simulations are not about flocking, but about finding complex/critical phenomena between chaos and order. Beware though, I'll propose something half-baked; It has some unkowns.

We'd need to use a different emergent phenomenon that can quantify the main characteristic of these systems. I expect a good candidate would be local Kolmogorov complexity. A good read on this is [Scott Aarsonson's post titled "Quantifying the Rise and Fall of Complexity in Closed Systems: The Coffee Automaton"](https://scottaaronson.blog/?p=1818) where he explains how a state on the edge of chaos and order puts the system in a more dynamic, expressive state, which can be quantified by this metric. I successfully used this before in Cellular Automata research on [quantifying interestingness in images](https://marktension.nl/blog/quantifying-interestingness-images-information-theory/).

When high complexity manifests, a clone of this pattern could arise as a higher level pattern, operating on the grid, but encompassing a larger chunk of cells, e.g. a 5x5 area. How would this higher level send signals to the lower level? I'm not sure yet. One way could be that when the higher level cell is active, it could randomly activate some lower level cells in its area. This would inject higher reactivity into that section, which is analogous to how firing onto a local area in the braincan brings it closer to its firing threshold, making it more reactive. 

### Can we say anything about consciousness?
I like to believe that the phenomenon of consciousness can be treated as a universal property like gravity. Gravity becomes real when the conditions are met: large mass. This is what made me excited about this recursive function for boids in the first place: it suggests how a higher level phenomenon can attach to the current level dynamics.

With every new layer in the hierarchy, there is a higher degree of integration of all phenomena in the layers below it. And every layer the system grows increasingly complex - it can take on more states.

Giulio Tononi's "Information integration theory of consciousness" speaks to this. His model argues that the more the system is capable of achieving enough expressivity in the number of states it can be, and integrating this information into a singular representation, it gets a higher level of consciousness assigned.

### Concluding remarks
I like how this model addresses how complexity can keep evolving. And how systems in the universe have self-organizing criticality. There are many other ways to go about this. Like with evolutionary experiments, and focusing on morphogenesis. Some notable works: [Hierarchical Neural Cellular Automata](https://direct.mit.edu/isal/proceedings/isal2023/35/20/116844), [Biomaker CA](https://google-research.github.io/self-organising-systems/2023/biomaker-ca/), and much more probably. And also definitely the [self-replication study](https://arxiv.org/abs/2406.19108) I mentioned earlier.

I will likely try to code the hierarchical BOIDS example in the near future, so stay tuned for that.

Nevertheless, I'm an outsider in this fields, using these ideas mostly for artistic purposes and my curiosity about life. These ideas represent my current state of understanding. If you spot any fallacies, know if anyone is doing similar research, or want to recommend me any reads, please email tensen[dot]mark[at]gmail[dot]com, or connecting on twitter.

If you happen to use this model somewhere, please cite:

  Hierarchical BOIDS and Game of Life and a theoretical model for consciousness, Mark Tensen (2024, November 10) [Blog Post].
  marktension.nl/blog/Hierarchical-boids-game-of-life-and-a-theoretical-model-for-consciousness
