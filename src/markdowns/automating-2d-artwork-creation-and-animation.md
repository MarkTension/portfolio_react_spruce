# Can I use generative AI for animation and amplification of hand-drawn sprites?

Here's some reflections and documentation on automating art creation for an iOS app that I'm building. Specifically training a generative model on my style to make more images or automate animation.

Besides for the pure creative joy, I think it's a good to experience the receiving end of GenAI as an ML engineer. The angle really was to use this to save time.

## Amplification
<p align="center">
<img width= "40%" src="/images/congi/C1.webp" alt="congi im">
<img width= "40%" src="/images/congi/C2.webp" alt="congi im">
<img width= "40%" src="/images/congi/C3.webp" alt="congi im">
</p>

To start I made 12 drawings of dogs on my Remarkable tablet.
Drawing is fun, but there's a balance between grind work (making animations by hand / drawing dog number 100) and creativity.

The style is black and white line-drawings, pixel art with a resolution of 100x100. It's not an uncommon art-style and it's quite consistent, which should make 12 low, but reasonable number for training a LoRA.

For training the LoRA model I used a Colab [notebook]([text](https://colab.research.google.com/github/hollowstrawberry/kohya-colab/blob/main/Lora_Trainer.ipynb)) which is based on Stable Diffusion 1.5. Preparing the dataset with captions and taining finished within 20 minutes.

For inference I used ComfyUI on my M1 macbook.
The goal was to see if this is a promising approach that'd save time without too much tinkering on parameters etc.

<p align="center">
<img width= "40%" src="/images/congi/lora0.webp" alt="congi im">
<img width= "40%" src="/images/congi/lora1.webp" alt="congi im">
<img width= "40%" src="/images/congi/lora2.webp" alt="congi im">
<img width= "40%" src="/images/congi/lora3.webp" alt="congi im">
<img width= "40%" src="/images/congi/lora6.webp" alt="congi im">
</p>


### results - LoRA
Under certain settings it generated _some_ good results. None were good-for-use out of the box though, and the quality was on the level _almost there_. The main problem was that it either repsected my style, but mutated the drawing I had in uncanny ways. (Didn't generalize enough between images). Or it went for novel dogs, but in a style that's too different.
The results were going in the right direction, but I'd need a bigger commitment of time to really make it work with more examples, more hyperparameter tunings. I think if my drawings would've aligned a bit better with conventional ways to draw dogs it'd be easier for the model to make novel drawings that were not in my training set. My usecase might just be too hard because the the authentic artstyle is really important.

The good part: There were some interesting drawings that could inspire my future drawings. As an inspiration tool it's quite nice.

## Animation
After researching the current state of the 2D art animation from a single drawing I learned that most approaches out there are for bipedal characters. Not for quadripedals. (take for instance [meta's animated drawings](https://sketch.metademolab.com/)). They have a nice free demo! But they couldn't fit a bipedal skeleton on my dogs. 

Also, there are some diffusion model approaches. These methods used pre-trained diffusion models and steered them with a controlnet or image2image. The main frontier was achieving temporal consistency in the characters. Some examples are [AnimateAnyone](https://github.com/HumanAIGC/AnimateAnyone) and the more specialized [Sprite Sheet Diffusion](https://arxiv.org/pdf/2412.03685), which is focused on cartooney sprites. I didn't test these though, because my drawings have too many legs, and would be too much of an investment to re-design.

As a bonus, I tried Luma's Dream machine. The promise is a good animation on demand for a few cents, which is a great value proposition and definitely the future. I used 2 images as keyframes and asked it to animate in between. However, my drawings were too hard to interpret for their models and resulted in Cronenberged animations.

Probably the best bet for great animations with these foundational models are images that lie more in the training distribution. Maybe easiest would be to start with AI generate images, so you know it's something the model has seen or can interpret. It's that or I should just get better at drawing.

### Conclusion - animation
For now I'm sticking with some wonderfully low-tech lo-fi animations.
<p align="center">
<img width= "40%" src="/images/congi/c8.gif" alt="congi im">
</p>

I found no out-of-the box methods to animate quadripedal. Probably in a year or so we'd be there.
But actually, it's sort of good news for me. 
It's just an extra reason for me to hurry up with this app now I still have an edge with personal artworks and going through hand-drawn animations.

I think it might make a pretty good business to specialize in sprite animations. With an approach where you're taken through the animation process step-by-step, each step allowing interactive revisions:
- Define the model (bipedal, quadripedal, inanimate (tree, etc))
- Automatic skeletonization
- Markup parts which should be animated by drawing on the sprite
- Text to animation
- Generate Animation

Major technical challenges, but as Paul Graham said: ["Run upstairs"](https://www.paulgraham.com/wealth.html).
