

<p align="center">
<img width= "40%" src="/images/bachim.png" alt="ld image">
</p>
This post is still work in progress. I'm training a Recurrent neural network on the Bach Chorale dataset in order to get some interesting musical results out of it. I'll share some details on how I trained it, and some early results.

#### Introduction

Recurrent neural networks (RNNs) applied to music generation are very interesting to me. This is largely because they enable real-time inference, and the memory and optional attention components are intuitive ways of processing information. Maybe it's because they're essential components to our cognition. I'd like to use this project as an ode to these networks.

This post is about generating music, but also on making the technology behind it visible, through artistic visualization. My code for this project is available on github.

#### Artistic visualization of RNNs
For this project I'm using the Bach Chorale dataset. The data is freely available online, in one consistent style, and most interestingly, always a 4-part harmony. This allows our network to get tested on generating multiple melodies at once.

#### Preprocessing
The data is in a numeric format, with each timestep being one 16th note.
First all songs are transposed into C major, or A minor scales with the music21 library.
All songs are concatenated into one very long song, with a special character for each end/start of a song.

#### Model
The model predicts each 16th timestep one note at a time. Starting with the 1st voice, then the 2nd, 3rd, and 4th. It "snakes" its way through, which is alright to do for LSTMs/GRU's since they've demonstrated to be quite good at counting tasks. The model is implemented in Tensorflow/Keras.

During training, the network is presented with batches of size 16, each containing a sequence of 128 notes. The notes go roughly through the following layers:
embedding(32) -> attention -> GRU1(256) -> GRU2(256) -> Dense(256) -> Dense(num-possible-notes).

Some notes on training: It's trained using Adam optimizer, Tensorflow Dataset API, a linear learning rate schedule, and 100 epochs.

It outputs a distribution of which notes are most likely, which is consequently sampled by its distribution. I'm sampling on different 'temperatures' to find the sweet-spot for predictability/chaos.

The last step is converting the notes into an audio signal, MIDI. This is done with python's Mido library. Next to the predicted notes, I'm calculating the entropy for each probability distribution over the notes in the model's output. The entropy is used as "Velocity" signal per note. Normalliy this is used to define loudness in audio software, but you can map it to do many cool things.

Midi is imported into Ableton, a digital audio workstation I use, and each midi score is assigned to an instrument.

Listen to one of the first decent results here. Here's the same midi with entropy and other instrumentation

#### visualization
Besides midi, the notes are also saved to a JSON file, to use it in the 3D graphics modeling software called Houdini, which is THE state of the art software for procedural graphics.

My friend Alex will make a procedural visualization using the entropy, probability distribtion outputs, predicted notes, and attention layer.

#### references
master thesis on the subject:
- BachBot: Automatic composition in the
style of Bach chorales https://www.mlmi.eng.cam.ac.uk/files/feynman_liang_8224771_assignsubmission_file_liangfeynmanthesis.pdf
- music 21 library https://music21.readthedocs.io/en/latest/
- vanilla code to start with https://www.tensorflow.org/text/tutorials/text_generation