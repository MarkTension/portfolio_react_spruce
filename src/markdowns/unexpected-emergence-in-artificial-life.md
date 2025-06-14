# Unexpected emergence in artificial life

I liked Michael Levin's definition of emergence in [a podcast with Kurt Jaimungal](https://www.youtube.com/watch?v=c8iFtaltX-s). According to him, central to emergence is an unexpected outcome. My simple working definition was always _lower level phenomena giving rise to a higher level phenomenon_. 
The more complete Cambridge dictionary defines it as "the development of particular patterns, properties, or behaviours in parts of complex systems that happen only when the parts of the system interact, and that the parts do not have on their own".

However, adding the element of unexpectedness in the definition forces a stricter and more useful guiding principle when researching biology / artificial life. I'll call it Levin-emergence for now.

An example is the BOIDS / swarming simulation that I've worked on. From the start I knew what was going to happen - swarming. The approach was top-down: how do I get swarming from lower level agents. Not much unexpectedness in replicating an existing system. 
The Levin-emergence part in this work was exploring the parameter space, where you find unexpected patterns from random configurations of the system's natural constants. And the addition of new factors that could influence the system. E.g. the constant pulsing of a certain parameter that put the system in an interesting new state of constant flux.

### Locomotion
Currently I'm working on a real-time model of cell locomotion. Also here I'm sometimes questioning where the Levin-emergence is. I'm operating with a top-down aim for replicatng cell locomotion. Even though it's never been done in a real-time particle system, I know how the cell will end up moving. This wrotomg is sort of a thinking pad to legitimize and give some relevance to my reverse engineering cell locomotion project.

### The final frontier: Open ended evolution
The most intersting aproach to Levin-emergence is modeling open-ended evolution. Nice article with definition, objectives and challenges [here](https://alife.org/encyclopedia/introduction/open-ended-evolution/).
Open endedness describes an evolving system that will never settle into a single stable equilibrium. Its results automatically satisfy levin-emergence because there are no top-down goals except open-endedness, and therefore no expectations.

Another frame to distinguish this is the classic research paradigm distinction: Top-down (reverse engineering) and bottom up (open-endedness). (This system is inconsistent when counting reverse engineering evolution as top-down, but let's ignore that)

- Bottom-up defines the intial conditions and takes the system for a ride with evolution.
- Top-down is reverse engineering an emergent phenomenon by factorizing it into its components (one-level lower abstractions), and showing that these components are sufficient for replicating the emergent phenomenon.

Going one level of emergence higher with a bottom up approach could be called a level-1 emergence. But this approach shouldn't be bound to just emerging one level: If the higher level emergence, emerges from itself (e.g. specialization starts to happen) we get a level-2 emergence, and so on.

I'm not saying open-ended evolution is a better research direction than reverse-engineering. The bottom up paradigm is more interseting to me when it works, but it fully depends on making an initial system that is rich enough in mechanisms to facilitate a level>1 emergence.
For uncovering those mechanisms we need to do a fair amount of bio-inspired discoveries to learn about the factors that are necessary to enable a succesful bottom-up approach. 

Also we need to learn what bottlenecks will be on the GPU when making complex systems, so that we don't producing a bottom-up starting state this is already too constrained. So in a way we could see the top-down approach like an acrobatic bouldering exercise to prepare for the full ascent to El Capitain.
