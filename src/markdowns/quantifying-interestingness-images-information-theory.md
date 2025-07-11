# Quantifying Interestingness in Images Using Information Theory

<p align="center">
<img width= "40%" src="/images/blogHeaders/information.png" alt="information image">
</p>

Making art with generative systems often involves a lot of parameter settings, randomness, and fine-tuning to get to a nice result. It’s a lot of work! Especially when dealing with random/complex systems that could under the same starting state generate thousands of different results. What if you can somehow automate this trial-and-error process?

In this post I’ll share what can be done with Information-theory and present an interesting implementation on Kolmogorov complexity to quantify “interestingness” of a [Cellular Automata](https://mathworld.wolfram.com/CellularAutomaton.html) system (and possibly automate the search for interesting images/parameters).

#### Criticality / sophistication

In terms of complexity, systems can find themselves in complete chaos (high complexity), or in complete structure (low complexity). In chaos, everything changes too fast and collapses (think white-noise), and in order, the state is frozen (a blank image). Both ends of the spectrum are not very imaginative to the human mind. The space in between these two states is where the magic lies. In physics, this state is called criticality. For an interesting read about (self-organized) criticality, check out Per Bak’s book: [How Nature Works](https://www.goodreads.com/en/book/show/869836). There’s probably many other quantifiable image qualities that estimate visual interest, e.g. “[fractalness](https://nautil.us/is-consciousness-fractal-6124/)”, but I’ll keep that for another day.

For our topic of interest, generative design, quantifying criticality in images could therefore serve as a predictor for interestingness. This metric can be used to e.g.:

- Generating thousands of images with your generator-program, scoring each image‘s criticality. Then select images with the highest scores.
  Or take it further, by sweeping the entire state-space of settings of your program, generating thousands of unique outputs per state. Then, later you’ll know which states generate the most interesting patterns, and which states could be ignored.
-

#### The Algorithm

Scott Aaronson has a nice survey paper “[Quantifying the Rise and Fall of Complexity in Closed Systems](https://www.scottaaronson.com/papers/coffee2.pdf)" . He uses the term sophistication instead of criticality, and describes a crude, yet effective way to compute sophistication for images:

Define 𝑆 to be the set of images which look the same as 𝑥 when down-sampled in resolution by some factor, and estimate it’s [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity). Which is basically down-sampling 𝑥 and (losslessly) compressing it, and measure the ratio of the down-sampled image/compressed down-sampled image.

Practically, this assigns close to 0 sophistication to a blank image, and also 0 to random noise (which, when down-sampled, averages out to grey everywhere). What maximizes sophistication is random noise, but on the same scale as down-sampling — e.g. if you down-sample by a factor of 5 to estimate sophistication, having each 5x5 block of pixels being a random color maximizes this measurement towards 1.

#### My Testcase

Aaronson showed his method with a Cellular-automata-based fluid simulation, mixing two fluids together over time, which slowly diffused from completely separated to completely mixed (like milk mixed with coffee). This simulation has two states per cell (coffee or milk). The sophistication score maxed-out when the fluids were in between fully mixed and fully separated.

It’s a great way to show the concept, but where I’d love to see this being used as well is in the field of artificial life discovery. Where artificial lifeforms are being found by building environments with simple update rules, resulting in complex emergent, complex behaviors. [Conway’s Game of Life](https://conwaylife.com/) is a good example. It’s a cellular automata approach, and while old, still has a big group of enthusiasts sharing results and variations. Another artificial life is [Lenia](https://golden.com/wiki/Lenia), also Cellular automata, but having continuous instead of discrete states.

To test out this method, I’m using a Cellular Automata project I had lying around: The Edge Of Chaos. This was made during a compute-shader course in Unity given by Arsiliath. The challenge here is that it has many states per cell, and sometimes some rare and beautiful results that can only be found with a lot of pressing the “reset” button. I’d like to test our sophistication method by showing that the more rare, interesting states get higher scores.

#### Edge of chaos

The simulation works like this: We have a 2D grid, with every grid-cell that can be in one of n states. To simplify it, I’m using only a grayscale version. In this experiment n=16. state 0 is colored black, and state 15 white. The rest are shades of gray in between.

The states will update row-wise from top to bottom, starting with all cells randomly initialized in the top-row. Each step, cells from one row lower will change according to the cells in the row above based on predefined rules. These rules can be randomly generated each simulation.

The system’s transition rules being random, as well as the starting state, makes this a nice use-case because we get a lot of variation within one parameter single parameter setting. 9/10 times these simulations generate not-so interesting results, but sometimes you get some cool visually pleasing “rare” effects. The goal is to catch these.

#### Results

The down-sampling took some playing around. In the end, down-sampling by rounding to the average state value gave the best effect (instead of the median , and mode state). Those resulted in too many states of 0. Also, I found that down-sampling the texture by a factor of 16 gave sophistication values that correlated well with my subjective opinion of interest.

Shown beneath are the result. Each figure has an original image, down-sampled image, and a sophistication score at the bottom. It ranges from 70 to 97. This score comes from the compression efficiency on the down-sampled image. (a bit on the small side, sorry about that). I hope you think they speak for themselves:

<p align="center">
<img width= "10%" src="/images/info0.png" alt="information image">
<img width= "10%" src="/images/info1.png" alt="information image">
<img width= "10%" src="/images/info2.png" alt="information image">
<img width= "10%" src="/images/info3.png" alt="information image">
<img width= "10%" src="/images/info4.png" alt="information image">
<img width= "10%" src="/images/info5.png" alt="information image">
<img width= "10%" src="/images/info6.png" alt="information image">
<img width= "10%" src="/images/info7.png" alt="information image">
</p>

#### Next steps

This project served as a proof of concept, replicating Aaronson’s work on my own simulation. It’s a work in progress, and what started my interest was using reinforcement learning to find interesting parameter settings of a generative system. The reward signal for the agent could then be this metric. Ideally, it can be used for big parameter spaces, where sweeping the parameters with a brute-force/grid search is less feasible.

However, first I’d like to make this work a bit more project-agnostic, so others can use it too. It could be made open source, and developed as a unity package. I’d love your input as well.

Ultimately making it into a quantifiable visual-interest library would be great. This would entail combining multiple metrics, such as fractal-ness, or color-balance, hierarchy, etc.

I’d also like to expand Aaronson’s metric by applying it on multiple scales. Not only with a down-sampling factor of e.g. x16, but also of x4, x32, x64. This could indicate that on different levels of detail there are interesting variations; x64 shows more a global variation with higher contrast between bigger areas. But variations on a smaller scale are also interesting, thus the x4 down-sampling.

Originally posted on my website. Follow me on [Twitter](https://twitter.com/Mark_Tension) for more updates on this.

#### References:

- Quantifying the Rise and Fall of Complexity in Closed Systems
- [A very helpful individual on cross-validated, who pointed me to aaronson’s work](https://stats.stackexchange.com/questions/563696/how-to-quantify-nature-likeness-criticality-complexity-of-image-based-on-its-ima/565075#565075)
- [Arsiliath’s](https://twitter.com/arsiliath) computeshader course
