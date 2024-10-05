<p align="center">
<img width= "40%" src="/images/blogHeaders/firefly_synchronizer.png" alt="ld image">
</p>

**Introduction**

Earlier on I shared about [my work](https://marktension.nl/#/blog/Artificial%20life,%20fireflies%20and%20music%20production) with firefly synchronization, or pulse-coupled oscillators. The mechanism is basically that we have a group of fireflies/oscillators, that emit pulses, each in their own frequency. The firing is random and chaotic at first. However, the synchronization algorithm makes the fireflies synchronize with another over time.

Besides [cool computer graphics simulations](https://www.youtube.com/shorts/xAIEW4pQowA), I'm even more interested in applying it to music. The firefly complex system is perfectly suitable for this because it finds itself often in states between chaos and order. This point is refered to as criticality, and these states have potential for interesting patterns/rhythms, that I often look for when creating my own music with [Tensen Park](https://open.spotify.com/artist/1lB15Q7MjR8s2j7TzeMP9Y?si=B-hhMFm8R56Xb_Miz4bybQ). In a way it can be seen as a sequencer that continuously changing the sequence and timing over time. The rest of this article covers the technical journey of buildinging it.

**First implementation**

As a first attempt I built an interface between Unity3D (graphics) and Ableton (music) software. It uses OSC messages sent from Unity to Ableton in order to generate sounds from the moving images. This works quite well for visually driving the sound. However, it's not easy to share this with other producers, and I'd like to embed it into ableton instead of this hacky setup. Especially this last point will help to use it more often myself.

Therefore I made a Max for Live device with MaxMSP so that it can be natively used in Ableton.

**Making it work in MaxMSP**

Max MSP is quite an interesting visual programming language. It can look a bit clunky if you're used to coding, especially when you encounter patches made by me. But it actually works quite well.

<p align="center">
<img width= "40%" src="/images/blogHeaders/maxmsp_hell.png" alt="ld image">
</p>

Before I got started in MaxMSP, in which I'm a total beginner, I had to make an efficient version based on matrix-multiplications instead of my custom GPU method. I used python and numpy for that, and my code is available on github [link](https://github.com/MarkTension/fireflies_vectormath). With this as a reference, I felt confident to replicate it in the unknown territories in max.

For implementing most of the logic and calculations I used Javascript, which is a supported language within Max. The way I chose to deal with the many matrix multiplications was to use the Jitter video module. It has all the operations available in javascript to do anything I needed. All in all it cost me about a day to make a vanilla version work.

For future, larger project, I might try out the GPU/shader methods as well, since MaxMSP facilitates embedding OpenGL shaders. But for the compute my device needs we're still pretty good with doing all matrix multiplications in Jitter's compute-optimized C-backend. Also, [I've read that Lua](https://www.mat.ucsb.edu/Publications/07_WakefieldSmith_ICMC_Lua.pdf) can have some advantages over Javascript because it can do OpenGL scripting as well as all the other thing Javascript can do. Also one of my favorite MaxMSP developers [Dillon Bastan](https://dillonbastan.com/) uses it as well.

**concluding remarks**

All in all, I think the device turned out pretty nicely. I made a video about it, showing all the features. I kept the amount of parameters and features a bit low for now, but there will be more versions in the future.

One thing that's particularly cool with this one is that it can receive MIDI input, to which it can synchronize. It doesn't syncronize under any parameter settings, but if you play with it, and don't make the the incoming pulses too fast, incoherent, or slow, then you should get it working in some form or another.

You can [download it from gumroad](https://tensenpark.gumroad.com/l/firefly_synchronizer)

**References**:
- Firefly-inspired Heartbeat Synchronization in Overlay Networks, Babaoglu et al., 2007. [Link](http://disi.unitn.it/~montreso/pubs/papers/saso07.pdf)

