<p align="center">
<img width= "40%" src="/images/blogHeaders/rl_header.gif" alt="ld image">
</p>
In recent years, Reinforcement Learning (RL), once a small branch within the field of AI, has gotten quite some attention. This was largely due to its spectacular success of achieving superhuman-performance on difficult games such as Go, Chess, DOTA 2, and Starcraft II.

Why now? Same as all machine learning since 2016: Increased computational power! This allowed RL to benefit from the latest deep-learning developments, and thereby starting its sub-branch called deep-RL. But are there any other applications in industry beyond gaming? Absolutely! As some of these will be covered in this post, I’ll also share one of my own use-cases within the digital arts.

See the project website [here](https://onformative.com/work/ai-sculpting/)

## **A quick primer on RL**

In machine learning, the most common strategy to train a model is supervised learning. It is incredibly effective: the model learns from a dataset of examples that each consist of an input object and a desired output value. The model thereby learns a mapping from input to desired output, by being shown which outputs correspond to which input. For instance, a cat-classifying model should learn this mapping with images as input, and a corresponding label telling it whether there _is_, or _isn’t_ a cat in the image.

For many business cases supervised learning is the best solution. But what if the mapping from input to output is not so clear? For example, when you make a move in a game of chess, it’s often only for later to decide whether it was a good move or not. Unlike mapping a picture to one output, such as in classifying cat images, the model has to take a series of sequential actions that by themselves do not necessarily offer direct feedback. In most cases it is not even clear what the right approach is from the start, and the model will have to probe the environment, and explore its way to find an optimal strategy.

This specific domain of problems brings us to RL. Generally speaking, the goal in RL is learning how to map observations to a set of actions by trying to maximize reward in the long run. RL can be used when the problem at hand can be modelled as an agent within an environment in which it should find an optimal way to behave in order to increase the reward it gets from the environment. See for instance the Pacman example below.

Each time-step in the environment, the agent gets presented with an observation, and it should learn which action to perform at that moment. If the actions make the agent reach its goal, it gets rewarded (and the set of actions that lead to the reward get reinforced). For the Pacman example: Pacman (agent) needs to do actions within the maze (environment) to eat food (get reward), and not get eaten by ghosts (negative reward).

<p align="center">
<img width= "40%" src="/images/rlIm0.png" alt="ld image">
</p>

So what is this agent exactly? Well, there are many forms, but in most modern use-cases with complex environments it is a neural network, with inputs that effectively summarize the environment’s state, and outputs that are the actions the agent chooses.

This way of learning poses many challenges and trade-offs, which are quite the subfields of study on their own. For instance, while the agent is being trained, how to find an optimal balance between exploring optimal outcomes and exploiting the current most rewarding strategy? Which actions in the sequence were most important for achieving the result (credit assignment problem)? How to learn in an environment that’s constantly being changed as the agent is performing actions in it? These factors contribute to making RL very hungry for training data, much more than supervised learning.

## **RL in the real world**

Since an agent needs a lot of training, often the way to go is training it in a simulated environment, where it can have infinite amounts of data. But there’s a distinction between a simulated environment and the real world. The gaming industry was already mentioned as a good application for RL, and that’s partly because the simulated environment basically equals the gaming “real-word” environment.

Nevertheless, RL is certainly used in industry. Some interesting examples are its deployment in:

-   Trading. JP Morgan [implemented an RL solution](https://ranko-mosic.medium.com/reinforcement-learning-based-trading-application-at-jp-morgan-chase-f829b8ec54f2) on Wall Street.
-   Industrial robotics. For example the startup [covariant](https://covariant.ai/), and the recent Microsoft-acquired startup [Bonsai](https://www.microsoft.com/en-us/ai/autonomous-systems-project-bonsai?activetab=pivot%3aprimaryr7) for industrial control and calibration systems. Their motto is by the way: build AI without data scientists.
-   [A/B testing](https://medium.com/engineers-optimizely/stats-accelerator-the-when-why-and-how-231ed6213d6d)
-   Facebook’s personalization engine for delivering relevant notifications/suggestions (which released an open source platform for large scale industry application of RL called [Horizon](https://engineering.fb.com/2018/11/01/ml-applications/horizon/)).

One of the shortcomings with reinforcement learning is that it isn’t as mature of a field as others. Results are often [not as reproducible](https://ojs.aaai.org/index.php/AAAI/article/view/11694) as would be optimal. Therefore, amongst real life solutions, sometimes other engineering methods are more suitable at this point. One _could_ for instance train a robot with RL, but robot manufacturer Boston Dynamics uses a combination of control theory with a lot of hardcoded balancing systems for their robots, with [great success](https://youtu.be/fn3KWM1kuAw). Same goes for landing a SpaceX’s Falcon 9, or controlling Tesla’s self-driving cars (although Tesla is using something like imitation learning, which is a form of reinforcement learning).

In short, RL is already having some success in industry, but it is comparatively small-scale, and not expected to reach the impact of e.g. supervised learning anytime soon. ML-guru Andrew Ng stated that “the hype around ML is a bit disproportionate to the value that’s delivered today”. See the graph below, and compare with google n-gram graph for the RL hype in literature. In the latter, also notice how deep-RL has made its entrance into literature since ~2014.


<p align="center">
<img width= "40%" src="/images/rlIm1.png" alt="ld image">
<img width= "40%" src="/images/rlIm2.png" alt="ld image">
</p>
  

_google n-gram plot of usage of ml-terms in literature over time. Notice how RL gets used more than supervised learning. (Maybe not strange since it’s quite a bit more exciting in my opinion)_

**RL in generative design**

As the first successful RL use cases are presenting themselves in industry, there are use-cases in the digital arts or design space as well. That is because, like video games, it can be purely simulation based, and not a lot is at stake when things go wrong such as in transport.

Especially the field of generative design might be enriched by opportunities brought through RL. Generative design, as Wikipedia describes: is an iterative design process in which a designer interacts with a program to generate a range of outputs. Then the designer can finetune the program to get another range of outputs, until some results are satisfying. This is used in engineering, architecture, and digital art.

For art, programs can be mathematical simulations of physics-, or biological systems. The rules that define the ground state of such a simulation are often simple, yet result in complex emergent phenomena, generating interesting visual results. See for example the physarum example below. This process is called [Digital morphogenesis](https://en.wikipedia.org/wiki/Digital_morphogenesis). For the creative coders amongst us, see [this extensive list](https://github.com/jasonwebb/morphogenesis-resources).

<p align="center">
<img width= "40%" src="/images/rlIm3.gif" alt="ld image">
</p>

_physarum by Sage Jensen_

In such processes, the designer shifts certain variables, rules, or starting states to calibrate the process, but RL can automate this process. It only needs an environment to design something in, and a reward metric based on certain criteria to evaluate the quality of its results.

  
**A case study with RL-sculpting at Onformative**

To give an example of applying RL to art/generative design, I’ll cover a personal project I‘ve been doing with colleagues from a Berlin-based digital generative design studio [Onformative](http://onformative.com/).

This project was focused on make a sculpting in a 3D environment. Which means, getting from a 3D block to a predefined target shape by removing mass from the initial block in a smart way. The agent needs to decide how to navigate the space, which parts to remove and how. It’s basically a simulation environment with infinite data and a clear reward structure, and therefore an excellent use-case for RL. The way to make the agent learn is rewarding it the right way: give reward when extraneous mass is removed, and penalty when mass that ought to be part of the final sculpture is removed.

<p align="center">
<img width= "40%" src="/images/rlIm4.png" alt="ld image">
</p>

_RL-sculpting by Onformative_

By experimenting with the tool the agent gets to remove mass, increasing reward for specific desirable behavior patterns, or changing the degree of freedom it has (e.g. can it rotate a tool) we were able to experiment with different styles of sculpting and get different sculpting aesthetics; For example, sculpting with a sphere shape gives softer results than a cube’s rather edgy, cubist style, which also requires a slightly different strategy.

By choosing the right training algorithm, Unity’s (game-development) [ml-agents library](https://github.com/Unity-Technologies/ml-agents), we were able to get some quite nice results, while still being work in progress. This framework we built can be used for other projects in the future, and the current work will be further improved. At the very least this project serves as a nice piece of innovation in 3D RL. As this is being updated quite regularly, follow Onformative to stay informed.

![](https://cdn.sanity.io/images/5qkm1oa2/production/c1683c80fc335d01313a2463e8c20808e87f9196-600x338.gif?w=800&h=400&fit=max)

_sculpting in progress with a graphical overlay describing different features of the agent_

**Conclusion**

All in all, RL is a specific solution that is best suited for a specific class of problems. Despite its challenges, it is going through an exciting period of rapid innovation. Its impact is not as big as the hype, but it’s very likely to play a more dominant role as it matures further. While we wait before being completely taken over by RL-trained robot-overlords, we can at least first enjoy some nice art, games, a few control/optimization data scientists getting replaced by RL-agents, and maybe some stockbrokers getting rich with their fancy RL trading bot.