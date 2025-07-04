# Artificial Life, Fireflies, and Music Production

<p align="center">
<img width= "90%" src="/images/fireflies1.png" alt="ld image">
</p>

#### Complexity of nature, and simulations

I'm interested in the emergence of intelligence, and replicating the beautiful complexity of nature. Often, these systems have a level of organization that the whole might be considered a lifeform, rather than the agents/units that make it up. I try to explore this blurry line of classification, and this time with a firefly synchronization model.

#### Firefly synchronization

Firefly-synchronization is a biological phenomenon in which multiple oscillators/fireflies follow a periodic cycle of flashing and rest. They oscillate. What's interesting is when there are multiple oscillators/agents that are coupled with another, i.e. they react on others' firing by synchronizing it.
In a simulation this comes down to starting with many oscillators in different phases, but over time, their phases synchronize with another because of the adaptation algorithm. The scientific term for this mechanism is [pulse-coupled oscillators](https://link.springer.com/referenceworkentry/10.1007/978-1-4614-7320-6_269-1). Pulse coupling comes down to the pulses sent by oscillators (when they fire) which makes them adapt to eachother. Not only fireflies, but more biological systems tend to show pulse-coupling. [Neural oscillations](https://pubmed.ncbi.nlm.nih.gov/12527010/) are much studied in particular, and are hypothesized to be important for the brain's computation.

#### My experiments with fireflies and swarming

I came to firefly synchronization because I'm a big fan of using complex biological systems for sound synthesis. I like to 'hear' the dynamics of these system to make them even more alive in a way. Growing unique sounds out of a swarm that emerges makes it a more compelling "creature". It gives it more of an identity. In the short term I'm applying these systems for music generation: The not-so-random emergent or nature-like characteristics of the simulation make interesting textures.

Additionally, with this work I'd like to explore data-sonification as a means for discovery, and discover if there's an argument to be made for using sound for 'perceiving' patterns instead of just visuals.

#### Setting the stage with a Python coding experiment

The paper I used for reference was called [Firefly-inspired Heartbeat Synchronization in Overlay Networks](http://www.cs.unibo.it/babaoglu/courses/cas06-07/papers/pdf/fireflies.pdf). The main algorithm described is the Ermentraut algorithm, which adjusts the firing frequency of each agent depending on firing of its neighbours. implementing this in Python. I successfully did this in python, making a graph with the networkX library to arbitrarily connect agents with another. It looked like so:

<p align="center">
<img width= "70%" src="https://lh3.googleusercontent.com/8i4CnsWvgLz9x-aLcYABs3i3eeEEV1pBVH1Gfbd8UnsnRXw-h59Yqw-T5zMS92BjCrgBzrf8ZG-8D7ejLWJGZQL6skHcEdKXjGmqDUS3Vc-fayfKkuVX9KEF4SascMZ-e7poEj_7U6A" alt="ld image">
</p>

Then I plotted the synchronization over time. The below figure shows the results, with on the x-axis time, and the y-axis is each firefly (800 in total). Every time a spike happens, a blue dot is plotted in the graph. As you can see, over time the random firing converges into synchronized firing. The [code is on github](https://github.com/MarkTension/FireflySimulationErmentraut). As a bonus, there's a midi module in the code that allows using the firing behavior as a midi device to use e.g. in Ableton. However, a real Max for Live device is in the making and almost done, so better wait for that if interested in using with ableton.

<p align="center">
<img width= "70%" src="/images/fireflies0.png" alt="ld image">
</p>

Also you can plot how the phases converge of all the oscillators. In the graph below are all the phases relative to one other phase. Note that we get three clusters, which is quite cool.

<p align="center">
<img width= "70%" src="/images/fireflies2.png" alt="ld image">
</p>

#### Replicating this in Unity

The plan was to not use an arbitrary connection graph between fireflies, but instead use a 2D map in which the fireflies move around like birds do.
To do add this visual bird-flocking component to it, I replicated it in Unity. Unity is excellent, since it gives easy access to the computer's graphics card, which allows visualizing huge simulations in real-time. For the movement part of the fireflies, I already made a boids flocking simulation, which I attached the synchronization algorithm to. This was made during a course I followed on using the GPU with computeshaders to do large scale biological simulations; Credits to @arsiliath.

The connectivity in this 2D simulation is based on whether other fireflies find themselves within a certain radius of another. This connectivity changes constantly, and sometimes isolating one flock of agents form another flock of agents, and later merging again.

Implementing it in Unity with computeshaders allowed using the GPU which enabled me to simulate 10k+ fireflies in real-time. [Here's](https://www.youtube.com/watch?v=C0ix9g39Ye0) how synchronization looked over time

Actually sending out audio signals from fireflies that were firing really leveld up the effect. This was done using ORC messaging protocol, which can be accesed by other programs. I used Ableton Live, and wrote a live device to detect such messages, and translate it into sounds. Ableton has a lot of interesting instrument options and effects, so I was pretty happy to be able to use that this way. Here's the result: https://www.youtube.com/shorts/xAIEW4pQowA

Then I made the simulation part more efficient on the GPU so it could simulate many more fireflies. The changes were done with a Bitnoic sort algorithm and tiling, based on [this physics engine tutorial](https://wickedengine.net/2018/05/21/scalabe-gpu-fluid-simulation/). This allowed me to simulate over 400k fireflies in realtime. In addition to this, I wanted to make multiple species of fireflies that would have different frequencies and not be synchronizing with eachother. Also in the flocking algorithm I could make different species e.g. stay away from other species, or prefer to stick more together in one group than other species. Here's how this looks:
https://www.youtube.com/shorts/ir6t19wP5BU

#### So what's this weird black n white figure ?

For experimentation purposes I like plotting what happens in the simulation over time. It helps when you see in one glance how patterns change over time when developing it. Additionally, it helps with compare different parameter settings of the system, and see how strong the synchronization effect was. The figures below are made this way:

Each firefly is one pixel on the y-axis, and a little white dot is plotted when it fires. I expected that there would first be noise, and later on lines instead of noise would appear because the firesflies would fire in synchrony.

I forgot that the sorting algorithm was continually shuffling the agent buffer based on their positions, ,which made the graph accidentally take the location of the agent into account. The result shows the fireflies flocking together as well, and moving through the space. Here's some results that show the effect:

<p align="center">
<img width= "90%" src="/images/fireflies1.png" alt="ld image">
<img width= "90%" src="/images/fireflies3.png" alt="ld image">
</p>

Here you see how at the start the agents are still randomly divided in the map, but slowly flock together. Also you see that certain groups over time start firing in synchrony. Because there's different species, and one with a ver low frequency that never fully synchronizes, you can see the differerent gradient windows that form. I really liked the result. They have a weird wood-pattern like structure.

I decided to make a few prints of these. Shoot me an [email](mailto:tensen.mark@gmail.com) if you're interested in having one in your house.
