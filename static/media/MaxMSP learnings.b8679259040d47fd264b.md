<p align="center">
<img width= "40%" src="/images/blogHeaders/max4lifeClean.png" alt="ld image">
</p>

# Lessons I learned, writing MaxMSP/Max for Live as a coder
### TLDR.
It's hella hard to avoid Spaghetti. But I alleviated some of my suffering with the points in the 'Some general learnings' paragraph in the bottom.

### Intro
Every day I code. 
And I go through the usual highs and lows; feeling like an expert when things work out, and oozing loser when they don't.

Luckily, over the years, a programmer builts some equanimity. 
Learning by heart that _every problem will get solved with enough sweat_ helps a lot. The feelings of desparation may now be embellished with sprinkles of hope, and glory. 

However, sometimes I fall right back into those early emotional coding days mindspaces. 
Especially when learning a new language, and feeling lost without the usual comfort of tools to debug, or known resources to consult. 
Learning to write compute shaders in Unity, C# and HLSL was a good example of this. But over time you learn about using Renderdoc for debugging, and develop familiarity with the language to intuit your way out of dangerous territories.

### MaxMSP
Learning MaxMSP has been an especially humbling endeavor.
Goddamn what a mess I tend to create.

There's no clean code interface, as most of it UI components are patched together in a tangbbgled mess. And time-sensitive messages with milisecond granualirity freewaying themselves through the convoluted highways of dreadful objects that are hard to debug. Punishing inefficiencies along the way with stealth and mischief.

When I found out that there's javacscript objects to create scripts and write logic, I thought I was finally there. You can control everything in Ableton Live through the Live Object Model API. I blissed out for a while, but hell broke loose writing time-sensitive matters with JS. JS is de-prioritized by MaxMSP, and time-sensitive messages are like a good wine put in the murky cellar to age a little bit.

### ChatGPT to the rescue
No it did not come to the rescue. ChatGPT and others are notoriously bad assistants with maxMSP. 

What does work though, is asking it to never give a patch (because it's garbage), but to write out patches of components in ascii characters. Sometimes you have to ask a couple of times if there's a simpler way to do it, but for straightforward logic it's OK.

It _is_ nice ofcourse as github co-pilot for Javascript (not the LOM though). But you gotta tell it that it's Javascript ES5. Many suggestions are ES6 and will not work.


<p align="center">
<img width= "50%" src="/images/max4lLifeUgly.jpg" alt="information image">
<img width= "50%" src="/images/blogHeaders/max4lifeClean.png" alt="information image">
</p>
**Left**: Oops Spagett, **Right**: Refactored

### Some general learnings
When writing patching, it's hard to separate by functionality. It's hard to make modules, because everything is patched together with patching chords, which creates an incredible mess. But there are ways to decrease entropy. 

0. Prioritize minimizing tech debt is even more important for maxmsp, because it's so hard to debug. 

1. Give yourself senses. Write many messages to visualize intermediate values at critical infrastructure points. Also for monitoring bangs I used the [button] object, which flashes when it receives a bang. It helps with debugging, or getting some intuition. 

2. Make sub-patches if you can. This is a number of objects patched together that can stand on its own, thus be put into one object. CMD + SHIFT + E.  Be careful with this though, because you lose overview: you lose your senses that you made in rule 0. As a general rule I don't subpatch when I think I need to still monitor its logic, or view messages. 

3. Instead of sub-patching, visually separate logic into clusters. Untangle that stuff. Sometimes that's incredibly hard because one functional cluster interacts with 3 other functional clusters. So you'll have to wire patch cables between those, messing up your clusters. But often that can be mitigated with [SEND x] and [RECEIVE x] objects. These are alternatives to patch cables. They will create extra components in your project though. 

4. You can search all instances of named objects through search (CMD + F). I use that a lot on SEND/RECEIVE objects, to highlight all occurences when I need to. 

5. Don't use SEND/RECEIVE objects within a sub-patch, because it removes the overview of what input/output a subpatch has.

6. Color-code SEND/RECEIVE objects. I tend to stick to color schemes like different hues for different functionality, and different saturation between send and receive. If you work with them, you can find every component easily, but you can also see which cluster interacts with which other cluster because of the joyful colored sprinkles you see in them. I tend to keep all other objects the standard color.

7. Ask coding assistants to write schematics of patches with ASCII characters. Helps sometimes if you don't want to browse the Max MSP forums. 

### Conclusion
These points helped me in my building endeavors. Hope they can help you as well. 
May the internet get saturated with many cool Max For Live devices, (that are slightly easier to maintain or improve). 
Please share other ideas that have helped you that I didn't mention. I still feel like a big amateur and can use all the help I can get. 

Reach me at tensen[dot]park[at]gmail.com, or wherever.

Also visit [my gumroad]("https://tensenpark.gumroad.com/") if you want some cool (and free) devices like my chaos/order firefly synchronization sequencer device, or MIDI evolution to generate long evolutionary sequences of MIDI notes. And more to come.