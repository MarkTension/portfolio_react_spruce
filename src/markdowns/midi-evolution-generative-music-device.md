# MIDI Evolution: A Generative Music Device

<p align="center">
<img width= "40%" src="/images/blogHeaders/midi_evolution.jpg" alt="ld image">
</p>

Excited to have released a new MaxMSP Ableton device called Midi Evolution that's been quite central in the way I make music. The device is called MIDI Evolution, and it gives a way to generatively create long sequences of MIDI based on an evolutionary algorithm.

It's released on [gumroad](https://tensenpark.gumroad.com/l/midi_evolution)

A video on how it works [on youtube](https://www.youtube.com/watch?v=seePqDeSVtE&t=1s).
And one [video](https://www.youtube.com/watch?v=XF68zyGC9IE&t=67s) with me talking you through it

### Why I created it

The idea for this device came from asking myself how to get interesting drum patterns that change gradually over time.

I've sometimes felt annoyed how I've been so meticulously crafting rhythmic progressions by modifying MIDI clips or breakbeats over time.
Before creating this device I didn't have a drum computer/kit to improvise or play with in order to get nice progressions.

So I wanted something that could do this in a generative way, that had the additional upside of surprising me with things I could never come up with myself.

I was much inspired by the book Collected Essays by Steve Reich in which he highlights a lot of his ways to create compositions based on algorithms such as phasing 2 melodies with different speeds, of having 2 melodies of different lengths play out against eachother over time. It's really quite cool.

### What does MIDI EVOLUTION do?

What I ended up creating was a way to evolve one midi clip or rhythm into another (target) clip.

The device creates new iterations of the original MIDI clip by mutating it and copies each iteration after the previous one. This proces of copying the copy and mutating results in a long MIDI sequence of morphing copies that slowly converge to the target clip.

Each time, it mutates the original clip a little furter to evolve it one step closer to the target clip. How it mutates and how many notes at the same time is customizable by the user.

The user can aim for e.g. swapping 5 random notes each mutation.
Or swapping from start of the clip to the end e.g. 1 note each time. The latter results in a slower convergence, so a longer final MIDI clip. (i needs more iterations to get to the target state).

I added an extra function to create a random state from a target MIDI clip. This random state can be used to start an evolutionary sequence from, so that device can create some nice beats that create interesting rhythms between chaos and order. Touching the same space of criticallity that I wrote earlier about in other articles.

### Further thoughts and future work

Actually quite happy how well it turned out. The time of writing is actually a year since I released it. I've been using it quite consistently when composing my own songs, and it's fun to hear how interesting or complex the rhythms can become.

Also a considerable amount of downloads on gumroad, which is cool. I like to release these devices for free. It's cool to see other people enjoy it, and I can get my money from other sources,a dn give back to the music community.

Next version I'll release will instead of making a new midi clip in the MIDI clip viewer, generate notes in runtime, so it will be a nice source of improvisation, or something that you can play along with, and change parameters in realtime. Thinking that could be super powerful, and fun for live gigs.
