# Reinforcement Learning Applied to Sculpting

<p align="center">
<img width= "40%" src="/images/blogHeaders/rl_header.gif" alt="ld image">
</p>

This is a technical overview of our reinforcement learning sculpting project. We will go into the reinforcement learning part, but also some additional technical details. Comprises work by: onformative.com - Mark Tensen, Alexander Hahn, Cedric Kiefer.

See the project website [here](https://onformative.com/work/ai-sculpting/)

## Glossary

Reinforcement learning (RL) - an area of machine learning concerned with how intelligent agents ought to take actions in an environment in order to maximise cumulative reward. The agent is presented in each time-step with information about the environment, and needs to make the best possible action from that information.

Agent - a machine learning model, seeking to obtain maximum reward from the environment. It learns the optimal behavioural policy by being trained. In our case, the agent itself is a Deep neural network model.

Training - Letting the agent interact with the environment, and rewarding the agent when it makes the right choices.

Reward - A numeric value, used to communicate to the agent which behaviour is considered “valuable” by the programmer

## 01. Introduction 

This project uses reinforcement learning to train an agent how to sculpt shapes in a 3D environment. We will jump straight into the technical details, and will reflect on it at the conclusion.

The environment is voxel-based, and the agent can move around through this environment. Each step, the agent can decide where to go and if to remove a mass of voxels around itself.

All the technical parts implemented in [Unity3D](https://unity.com/) and Unity’s [ml-agents library](https://github.com/Unity-Technologies/ml-agents) was used for implementing the Reinforcement Learning part.

The agent’s sculpting objective is as follows: the starting state of the environment is one big cube/block. Out of this, the agent needs to remove mass to get closer to a predefined target state. The target state is a 3D shape (most often a human posing) defined by us. The target state overlays the block in the current environment, but is only visible to the agent. For the agent, this puts each voxel in one of three states: (1) target → don’t remove, (2) residual → remove, (3) empy.

We first did a simplified experiment in 2D. See figure 0 for an intuition. Here the agent only needed to draw a predefined state from nothing. Further on we’ll explain what’s exactly happening in 3D, which should also explain this 2D example.

<img width= "40%" src="https://lh5.googleusercontent.com/1g3wDe8oBf5U7NLzrqV9L-IO3hPenTn0Vsj55Jj9IPLpqBFtianx3HnV257pjW5L5XeRogeFwpPA1KIWX9sJmMblOXLPmsJCB6y2INlvRGysmMjNOaVhAITGB9n7jzfQpZOtPHC2sO5SIqZWihKB8XBIUDMCg_VcNvLZpyPm0lUaMA9IDf4Grl124nla1g" alt="ld image">

Figure 0. A first RL experiment in 2D. top-left: predefined state the agent needs to draw. top-right: current state, bottom-left: the residual pixels (target - current), bottom-right: the agent’s view, having only partial observability of the environment.

## 02. The Agent

### Reward function

The agent’s objective is to remove as many residual voxels in as few steps as possible, whilst leaving the target voxels intact. Per time-step, we can define the number of residual voxels removed as vres, and number of target voxels removed as vtarget. This gives us the following reward function:

Rt = (vres - vtarget) -

Rt is the reward for the current step. is a constant > 1, to penalise vtarget more than vres is rewarded. is important because without it, the agent tends to ‘eating-away’ too many target details when sculpting. That is because its tools can often remove thousands of voxels at once, thereby not caring about collateral target voxel damage. is a constant number around 0.0001, to encourage the agent to work in as few steps as possible. is a small number around 0.001, which simply scales the reward signal down.

A slight addition to this reward function is that the agent initially tended to go into the initial block like how a caterpillar would enter an apple. For a more visually interesting process we wanted the agent to work on the outsides of the cube. We incentivized the agent to do this by giving higher reward for voxels further away from the cube’s centre. Therefore the outer 5% of residual voxels vres-bonus get a higher reward, scaled by a constant (typically around 1.5):

Rt = (vres+vres-bonus - vtarget) -

Additionally, in some sculpting explorations the agent got multiple tool sizes. Larger tool sizes are riskier since the agent has a higher chance of accidentally removing the higher penalised target voxels. When unmanaged, the agent tends to converge to use only its smaller tools. To encourage a more balanced tool-usage early on, the agent gets an extra reward bonus for using the bigger tool sizes.

### Observations

Because of the size of the environment (164*164*164 = over 2M voxels), the agent has to have senses that reduce the information of the environment into an intuitive and workable amount. To get such a representation, we engineered three different observation types:

#### a) Visual

<img width= "40%" src="https://lh3.googleusercontent.com/nnNuRtcgfj_r0TOnu6X__dcpXcVzz7YpFoWE07ADlxnmbb7HP119n79-ufZILWP73fkVuqjlLl2qo5L88UCdKXB681MBGXh3RD9bSyPCZhAdlx8BmYQ6hcIGPMcxA3HcYn6fnuAXPAvnkCaz5oGpMXw-q1GBOuej395opAtbh1Zl6O1_qwxoWsosGOMIXw" alt="ld image">

Figure 1. The agent’s visual sensors: four slices of the 3d env centred on the agent (red)

Each step starts with a “visual” observation; A number of differently oriented 2D slices of a fixed size, centred around the agent (figure 1). The slices had a width of ~23 pixels. In the figure you see 3 slices to keep it simple, but we’ve found that including diagonal planes increases the performance. Each pixel gets 5 channels that are either off (0) or on (1), corresponding to the voxel’s state (figure 2). These are mapped to RGB to visualise and debug the sensor:

1.  Red: removable: filled-but-should-be-empty
2.  Bright-red: Red voxel on the edge.
3.  Green: target: filled-and-should-stay-filled
4.  Blue: Empty: already removed mass
5.  Black: Out-of-bounds

<img width= "40%" src="https://lh5.googleusercontent.com/NtXO2s9bcB46Wae_a6Rzkezhsj7wfbiv0yuyzdd3f2hHCQeqls7_5Lh4qnR6JxulhY2_hYjdwMRl1ds63zMmU6i_OhZsM3K5IQf5jn9qZJDaGg39TREpQ3lO3pUOdSU72KsVpKiAagcqLEmkeauAakGm5gcsdcm8pOH6VWynzX3WuGmfZKGu99z4qqvsVQ" alt="ld image">

Figure 2. Simplified example of one visual slice in RGB. Green represent target voxels, red residual voxels, blue, empty voxels, and black is out of bounds.

Additionally, like the [human retina](https://en.wikipedia.org/wiki/Fovea_centralis), the pixels centred around the agent have higher resolution than the ones in the periphery. This is done by pooling the periphery pixels, and leaving a 1-to1 mapping in the centre. This was primarily to increase the coverage of the visual sensor, and keep the computational cost low.

Whether a voxel falls in the range of its tools is also encoded. For three tools, this results in three extra channels on top of the existing 5. In figure 3 you can see the RGB sensor with three levels of brightness representing the three tool sizes.

<img width= "40%" src="https://lh6.googleusercontent.com/SBY8lJCxu__LV4Jkt2gY6ks9VzCYkf1s9YzRy2WB3v_yRPR3Jr8H5YkQ80sYlVlgYvIRvbcHEhqDQOT0ngzZ_GYb5UQGVet3zsHSMaaGOt67OYIScGNb64zTHvsvWqEGGQ0GXVTagiC2Z-Px9KJhfMXJStheIJeeQv66yEdPK3MCct0QU4curzmnUtQDsA" alt="ld image">

Figure 3. Example of one visual slice in RGB, including three toolsizes of a sphere-shaped tool

#### b) Long distance voxel distribution

<img width= "40%" src="https://lh6.googleusercontent.com/iKdhAr3nrsfUmhpVHFu0XIUqOj5qSqNEkuLDvbs6WylfaK1wkwHj8bEkxzWyI-_ojLAvr6S_aJ7klA8kSIucJDaiIlqU077Yy_fxNSamP0NMFfxdgRxQRL_zOsYRrD0QTWBb9hMRjppCXvuzlWuIh7C6Kpn1F71Mp7CeT6y3QjPw63ldRggy3l57jLxyw" alt="ld image">
<img width= "40%" src="https://lh3.googleusercontent.com/WWnmOeeb5Komes8cuF2SYRTIkhBdfzyVeg0NQ5pK6ur3eKTl5B1g0-EIjO5oOlGcOM79_zJoy6bWW7nRHUpTTE1WWCJFIQXM1P8xsn96qFJvu4R1qu8Bc07g-3k6H0PAuEDUcQUwWlyLqkhjVg5PXtIOfCRF5iwPZFyjhnpuH4MoLkT6oTXBXWuxNgn04w" alt="ld image">

Figure 4. Left: The agent’s long-distance sensors: Six pyramid-shapes centred around the agent that each aggregate the ratio of one voxel type compared to the grand total of those voxels. Right: The long distance sensors combined with visual sensors

When only using visual sensors, the agent tends to get stuck optimising low-yield areas of the environment, while it can make greater impact at other areas which it doesn’t know about. To get an intuition about where high-reward areas are in the environment we implemented the long-distance sensor. This sensor consists of 6 pyramidal-shaped volumes emerging from the agent into dix directions (Figure 4). Each shape takes the count of each voxel kind (residual voxels and target voxels), and divides each by the total voxel count of that type. For the agent, this shows how voxels around it are distributed, thus where it should move to make the biggest impact. An example for residual voxels is: [0.02, 0.08, 0.2, 0, 0.7, 0].

#### c) Vector sensor

How close the agent is to completion, and the agent’s last actions is also modelled for the last n steps. n was generally kept at 16, which was a good tradeoff between information and computational cost:

- Percent completed: one-hot encoding of 5 discrete stages from 0-20% to 80-100%
- Previous tool-action: one-hot encoding
- Previous move-action: one-hot encoding

Because there is a timing aspect involved, we experimented as well with setting n to 1 and giving the agent memory, by implementing an LSTM cell. We found however that training the agent took much longer and did not give a better result.

### Agent actions

Each step, the agent must choose three actions:

- Move: The agent can freely move in 6 directions, but can neither penetrate mass or the environment’s edge. The agent may also choose not to move.
- Step-size: The magnitude of a move: [1, 2, 4, 8] voxels.
- Tool-action: [no-action, small-tool, medium-tool, large-tool].

### Agent architecture

The agent models the mapping between sensor input and actions with a deep neural network. Its network architecture can be seen in figure 5. The visual inputs are each put through small convolutional networks to extract important features. The outputs of those are concatenated with another, and flattened before being put through a dense layer. The vector inputs are concatenated with the dense layer’s output. That output is put through a final dense layer that maps to the agent’s output: four one-hot vectors representing the movement direction, step-size, tool action, and how to orient the tool.

<img width= "40%" src="https://lh6.googleusercontent.com/v_LQuiBvwrh--vyjdHkpi8EL11WhGCShZJ0TYc6D760S4jvfkK2Nmw4ANpgFDgfFRR5Z8NfwOmAmk_9Ktt_Wn51icBS93skLyl-QUIhJB4PqpUQFtXN4VEyVwuCrX3rbq51CIy27baW7rye1FPWViiUFIIVTgsr6akW6pjTEvPOuLFlSxjVwD90dVgGiWw" alt="ld image">

Figure 5. The agent’s model architecture. The model maps the visual and vector input to three output vectors.

### Training

All in all, with the senses we have engineered for the agent, and the reward function, the agent must find a policy to get the highest reward possible. It faces a set of decisions and tradeoffs it must learn:

- In which direction to move?
  - How big of a move?
  - Where has it already been?
  - Where can it make the most difference in the long-run?
- Remove mass or not
  - If removing mass, how?
  - Which tool size?
  - Which tool orientation?

To learn the optimal balance, the agent was trained using deep reinforcement learning. Specifically, we used a [PPO](https://openai.com/blog/openai-baselines-ppo/) implementation with Unity’s ml-agents library. ML-agents provides a neat Reinforcement Learning API with many state of the art RL implementations that we could easily use, such as action-masking and curriculum learning.

#### Training environments

During training, the agent was exposed to random samples of the following set of environments that it must sculpt within n steps.

- Random complex: A random complex target shape consisting of many different primitives randomly combined.
- Orientation: A simple square of residual pixels respawning to a different location as soon as it is cleared. This was useful for training the long-distance sensors. Without this specific training, the agent does not learn to use those sensors well.
- Orientation-obstacle: The same as the former orientation environment, but with a target plane between the agent and the residual square that it must navigate across (figure 6, right).
- Motorblock: custom shapes that are specifically designed with custom-sized edges that fit only specific tool sizes (figure 6, left). The idea was that it explicitly trained the agent to dynamically adapt its toolshape to the environment’s requirements. We found that by including these, the agent is more likely to dynamically switch tool sizes when e.g. working on finer details.
- Validation: Actual artistic target shapes used for validation during training. On these, the agent’s performance is summarised during training to track performance.

<img width= "40%" src="https://lh5.googleusercontent.com/r3U9sBfyIM8wrOO9LmrVE4N1aDYzSnmyVqQl4fqkzeYpJy0qudQccN0KfrxlxZ0nIJBaZXF783P8AlnSs5Td-lkdeSbOSIu2I5Ye3INJRC0tFKpldiOGQ8N8RbeDUHgQEKduvWDRDskFaEkNLCKWxAlY159oMyEe5clcKhWFz6px2VzcjICkpbqqY_kwKQ" alt="ld image">  
<img width= "40%" src="https://lh4.googleusercontent.com/-7BoXbamiLHKZ48dXu7eeMb-OteHuuJ8NN6cI7laUI9M92Y17Fn8fRihOVlS0JRTRaEGNwN-EW2mEFfct05sg0PDHbDHYr610235WTQFHfcuij5_CjRC_fz_wePWr6hWjTQW1E8VVEO1XehL0mGHDH9qC_eMaYfZu8RvC1LmBZcrqbqK9I4RIfuuss9ShQ" alt="ld image">

Figure 6. Left: Motorblock environment, with fine grooves for the small tool on the outside, bigger cavities on the top, and the inside is also accessible via small entrances. Right: Orientation-obstacle environment. Note the visual-sensor debug view on the left, with the plane in green. That is a target shape which the agent needs to move around to get to the residual blocks.

#### Monitoring training

Besides tracking the cumulative reward during training, which signals if the agent learns to get more reward over time, we added some custom tensorboard summaries to track specific metrics of interest. Examples are percentage complete at the end of each episode, or the relative amounts of different tool-sizes used. See figure 7 for some examples. Many research iterations were spent on modifying the environment or agent and tracking these graphs to see if the design choices increased the agent’s performance, or whether tool usage was balanced enough.

<img width= "40%" src="https://lh5.googleusercontent.com/UXisUyxMauT0KX24JC4xPqTkuxrV-dldXE1vrZDw07xu3jVNZF3gAhN1pmlHUSnjTzc2U0ksUf7mldAfa0BuB3wzCFDzMCekQjbVgXaqSPPUJYqkKLcg2O-Dt8EN6TC3grBhALg8J6sLkquHYGb_kTCaHZVcAGOCWvtLAOsm8wa8NTftrc1ZKMaQcKVRcw" alt="ld image">  
<img width= "40%" src="https://lh5.googleusercontent.com/kHJQv6yoHlA57VLV6k52q28H0VSwFI8vlgqzp_dFA6QyhUjNFeMg1HrxYzt0-ADLnOMynLW07NPz7EDYivWAfMh8mvfJbp7-G3Hwx-W2HxWWgvDKvQZYJ9NoWh6IQT9i89Z6nMbql65vxO23SoSynGj0Nn_cPs6MT-Udzf3_s6dBJ5PgBkZOMyhOFIzezQ" alt="ld image">
<img width= "40%" src="https://lh3.googleusercontent.com/kKe4m9x1CvIwftL068wa-h-InT8nmNa9cW2OcwV2sTNlau3yK4e_RLVJNxoybLjEVxvkuUwFYNh5WT4z4snQO-RgRA8juGDIg1uoYhtLbgoH3sLrFRPHlU4BIdmVuceow3GbigzpGbCgyZkUfwWwCuSPY0-PhOuQZFz9tyybZ6e1rCYFQy2nLiYXfr4Wiw" alt="ld image">

Figure 7. Example graphs of tracking training progress. Number of training steps is on the y-axis, and the y-axis is the metric value

### Tools

The training and design of the agent/environment happened in Unity, and Unity’s reinforcement-learning library ml-agents was used for the RL implementations. Earlier we mentioned the environment was a voxel-based environment. That is true for counting the number of voxels removed, and keeping track of the state, but we used signed distance functions and raymarching to render the environment, apply actions, import target shapes, and generate the complex shapes during training. Our custom SDF API was faster than instancing voxels every step, and it looks smoother as well. In the end we could let the agent sculpt in real time, with an acceptable FPS. See figure 8 for how the smooth SDF render compares to the voxels.

<img width= "90%" src="https://lh4.googleusercontent.com/kLR4GOD7x5mw-E2paJTF5Dk7p9IxeBWj0kd80NNU31Z1uhuRWDQLS9b7ZKRqgLE-o6JJq1e5P8J-G9l6eN7Hw6Xkj2kEXfc3IHGwY_ZUoKGPM2bq6bDydTmjVt9esb73_G0r-cbwfPoFex0J0FW6eke-puZ_xldiBPDSCN3VnIJWqf0lJ1fUpwPydewBjw" alt="ld image">  
<img width= "90%" src="https://lh6.googleusercontent.com/r1nRccNv5ykTAyvePkPXVc45aOYR_5_DKZFeD2m5TuyLw7-Z_GvSveJDLwC-uFGyzAlDnJVsgPcXAXflsLQ_r6mGzfu-Wu68AvOb-vcyy4_dOZA6s7YvO2Kknd3GbCTf12SNSCvJQys0-V2qRQkcWakyRYf-HRT9mmaLeeJZBL-GbLMtd0pKWmiH0rhuGA" alt="ld image">

Figure 8. Unity interface example of purely voxels (left), and SDF (right). Each example has two viewing angles of the sculpting.

When an agent is trained, we visually assessed its performance by letting the agent sculpt a target shape of our picking in Unity in inference mode. The interface for that is Unity’s gameview, with 2 cameras (figure 9).

<img width= "90%" src="https://lh6.googleusercontent.com/yPmXayQK-SwvmS9nqM-1ZjIIOokoa_hjWEhgl9-T94HXKeSkV57iZtShHsCri-quVeIMBMTgeK6mv8zNZ_jJe80OWPP2znoaVaa5hie4JOaNSoHNLhvqyoKJ9NHptbv6DNEiKO6njxfarEZiQdHmCuQsKEbKsw-rnk2IkGAJId8MMgspS7D3evJxGZMF65A" alt="ld image">  
<img width= "90%" src="https://lh6.googleusercontent.com/oDDriuKKhN8U7q3pQiZ6qYPKunAeZ5uXvLdloDomoVRqJmAVyW-JFLDCUne418C6hRb6s2O5RXDYVocaMnfO-gjQOSUMYQIWHIB7HmScEDwj_f_S65rJb85-_IEYj4bk59Q6EbNUC6xhwRSncIi431XNy1zST2NX0APTq2ovUAcgAXmES7DEm-nf3P7IYw" alt="ld image">  
<img width= "90%" src="https://lh4.googleusercontent.com/tR7PF_8PWmbYG7WyomYpbQ0j8CJyyKQav_veb-tj2eU_MOSpNi1i3eCxeGOKpOrC16Fnwlje6d_PeONmdRUV2TjuD7WfSFmH9hBB0n3FAZyHCscyxcktZODSIPoXG9zretEeNuOwflG-hFUibPV1YpD_gJibbbjNx8ESrZY9GhVCUfa1rBiDf3otWz3Yow" alt="ld image">

Figure 9. Unity’s game view during the agent’s sculpting. Also note the different metrics on the right, including the action count and reward per tool, percentage target voxels deleted, and the red and green bars represent reward (green) / penalty(red) at the current step.

Log files for Houdini and generative music

For higher quality output in terms of visual effects, and more artistic freedom for designers with regards to materials / lighting / physics, we replicated the agent’s behaviour in [Houdini](https://www.sidefx.com/). This replication was done by storing all of the agent’s actions to a JSON file (figure 10), and reading that into Houdini.

<img width= "90%" src="https://lh4.googleusercontent.com/bCoF0vrPiGH5ws_Wa7NjznKlgFFNk6DiTmZtpdD-7el9WRsh0WTd0kUVjgnJkICH5xQUSNH843PidCCJPSH1NGwgqG0cuHl-9eZ6CDDJKUE0-xOwlWxmCKHEqq-G-HS3fE4Nnl40e_syqYMHXH4XfGF7EmZ1AH1ZMVI2wD-hTvPlBBl55kOfzJSicSResw" alt="ld image">

Figure 10. Example of a JSON file with all the data for replicating a sculpting session in Houdini and Ableton. AgentPath / actionDirection contains the entire sequence of all movement actions of an episode.

Also for generating data-driven sound to accompany the renders, we used the same JSON file to transform the agent’s behaviour and reward signals into MIDI notes. Python was used for this transform. The MIDI signals and velocities were then mapped in [Ableton](https://www.ableton.com/) to generate sound: Different tools drove different instruments, and reward was mapped to filter frequencies and loudness in the composition. All in all the music was meant to give a bit of a feeling for how it could be in the agent’s brain.

## Conclusion

All in all, this document presented a technical approach to explore sculpting using artificial intelligence. Instead of going for a generative modelling approach, using e.g. GANs, which interpolate existing 3D shapes, we explored the possibilities of Reinforcement Learning. This method highlights the process of craftsmanship by a sculptor, showing step-by-step how an intelligent agent would balance trade-offs given the rules of the game: environment, its senses and the reward function.

The human aspect is quite clear in this: We chose the rules, and what the output should approximately be. But in the end it was the interplay between our human choices and agent’s capabilities to find solutions and occasionally surprise us, which made this work interesting to us. To facilitate a degree of freedom and room for errors for the agent, we tried to gently push it into a desired behaviour, instead of imposing hard constraints. This is exemplified by the bonus for using tools more efficiently or staying on the outsides, using blunt tools, and sculpting for only a limited amount of steps. Because the reward function plays such an important role in this, we found it valuable to integrate the reward signal within the final animations and music.

To conclude, we hope that this approach can inspire others to explore the interesting world of reinforcement learning for arts. Or to think about how we can train models

## References

- Unity3D
- Ml-agents
- Houdini
- Ableton
- For an extra efficient visual sensors implementation: [Open-source Grid Sensor by MBaske](https://www.google.com/search?client=firefox-b-d&q=grid+sensor+2.0)
- Transforming mesh files into SDF with the [mesh-to-sdf](https://pypi.org/project/mesh-to-sdf/) python pip package
- Converting data to MIDI: Python’s [MIDO package](https://mido.readthedocs.io/en/latest/)

## Credits

[onformative.com](http://www.onformative.com) , 2020-2022  
Mark Tensen - Reinforcement Learning, Unity Implementation
Alexander Hahn - Designer
Cedric Kiefer - Creative Direction
Norman Wasmuth - Houdini-integration
Bernd Marbach - Designer
