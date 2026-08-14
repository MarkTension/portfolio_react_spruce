# Future of digital art is generative models or code?
<p align="center">
<img width= "60%" src="/images/blogHeaders/mythstream.webp" alt="mythstream">
</p>
<div style="display: flex; gap: 0.5em; justify-content: center; flex-wrap: wrap;">
<video src="/images/grid.webm" style="width: 45%; max-width: 230px; object-fit: cover;" autoplay muted loop playsInline></video>
<video src="/images/steric.webm" style="width: 45%; max-width: 230px; object-fit: cover;" autoplay muted loop playsInline></video>
</div>

### From generative design to generative models
When starting my carreer from around 2019, I really believed in creative coding and commiting to the art of generative design through creative coding.
My heroes were (and still are) [Zach Lieberman](http://zach.li/), [Arsiliath](https://www.youtube.com/@arsiliath/videos), [Manoloide](https://x.com/manoloidee), [Tyler Hobbs](https://x.com/tylerxhobbs), and many more. Some popular frameworks at the time were Processing, OpenFrameworks, Touchdesigner and P5.js. Or directly programming the lower level graphics APIs, through WebGL, GLSL, WGSL etc..

I worked a super fun job at the time, at [Onformative](https://onformative.com/) making a 3D [Reinforcement learning sculpting agent](https://onformative.com/work/ai-sculpting), while learning more about generative art. I wrote that project up in detail in [Reinforcement learning applied to sculpting](/blog/reinforcement-learning-applied-to-sculpting), with the background theory in [a primer on RL and its application to art](/blog/primer-reinforcement-learning-application-to-art).

The peak for me was somewhere around 2021, with a lot of sudden interest in it coming in via the NFT wave.

At some point though it seemed that the trends for digital art are going the other way though: Big generative models operating in pixel space, making pretty images or videos from text input. Independent of that, the NFT market crashed hard at this point. (I wasn't so surprised though with all the slop on there).
But during that time, Generative design via creative coding seemed a bit in decline, and seems less relevant with the increased capability of generative models. This was a bit sad imo.

### Controlability shortcomings
However a big problem with using prompts for images is that it is still a bit clunky. Methods to add control to the model, like LoRA's or Controlnet are really cool, but the amount of control for an artist still leaves things to be desired

This was the strength of creative coding. Being in total control of every layer in the process: Any single color value, noise probability distribution and physics dynamics are precisely tuned by the creator. And ofcourse the fun of undpredictable things happening with small errors was a really powerful interface for making interesting art.

### A comeback
What changed my thinking was what happened acouple day ago. I was making video material to accompany my new music release [Mythstream](/blog/tensen-park-mythstream). It was a simple idea: sample frames from videos created when working on ["Microcosmos"](/blog/microcosmos-differentiable-artificial-life) at the Artificial life institute.
This would create a database of frames. 
Step 2 was orchestrating them together into a video by randomly sampling frames, a consistent color scheme, pixelating, working on a time-grid to create rhythmic transitions, making distinct sections to keep things interesting, quantized noise, and matching the music's BPM.

The video is to be found [here](https://www.instagram.com/reel/DYUkl9DihCc/?igsh=b3RlcDNidGR5NGdr) on my Instagram. Code is [here](https://github.com/MarkTension/mythstream_video_editor) 

This project only took a couple of evenings using AI assisted coding. It's cool that this swiftness to create software on demand completely bypassed the need for a video-editor, or other software (except for the libraries I used (big shoutout)). And even more, it is accessible for anyone that is not technical who just wants to make cool unique stuff.

The process created some abstract form of a video editor. A yaml config file with all the timeline events and control signals that I needed. Pasting the config to the very end of this page for an idea.

The code could totally be built in something much more solid, but doesn't have to for now. It reached its purpose. And probably for the next project I'll reuse it and build it further to suit that projet's needs. But the point is that you can have the cake and eat it too.

You get full creative control, and with quite minimal resistance, with the bonus of feeling creative yourself. The resulting product is in my opinion much more unique and distinguished than prompting a video model.

AI assisted programming will get even better and faster, so I'd put my money there for the future interface for digital art (instead of generative image/video models). Sidenote: these models will still totally take over other things, such as video generation etc. But for humans creating art, I predict it less the future, at least for the interesting things that will be made.

Just for the idea: The config interface that made my video:
```
bpm: 120
size: "1080x1080"  # output frame size WxH; nearest-neighbor upscale applied after filter
dev: false         # dev mode: skip upscale + Instagram export, output at source resolution
watermark_size: 70     # font size for "MythStream" watermark; use --no-watermark to disable
watermark_x: 74       # pixels from left edge
watermark_y: 74       # pixels from top edge
watermark_color: [150, 150, 150]  # RGB color of watermark text
watermark_glitch: true   # randomly permute chars each frame
watermark_glitch_pct: 10  # % of characters replaced per frame

watermark_segments:
  - text: "MythStream"
    duration: 5        # seconds
  # - text: "Tensen Park"
  #   duration: 3
  - text: "29/05/2026"
    duration: 5
# framerate: tick notation 1/32 1/16 1/12 1/8 1/4
framerate: "1/24"   # → 8 fps at 120 bpm
# duration / mode are ignored when 'segments' is set below
# duration: 15  (in beats)
# mode: rhythmic
filter: mythstream  # none | pixelate | bw_pixelate | mythstream
pixel_size: 8
brightness: 1.2
saturation: 1.2
seed: null

audio_offset: 47.0
no_audio: false

n_colors: 10
color_threshold: 50
color_ratio: 1.0

# Rhythmic frame selection --------------------------------------------------------
#
# Each controller maps a signal to a shape feature.
# Type is a subkey with its own params:
#
#   sine:   {bpm, phase}          smooth sinusoid
#   saw:    {bpm, phase}          linear ramp 0→1, hard reset each period
#   square: {bpm, phase, duty}    binary 0/1; duty = fraction of period in high state
#   random: {bpm, smooth}         Poisson sample-and-hold; smooth 0=step 1=linear interp
#
# phase convention (sine/saw/square): 0° = starts at minimum, 180° = starts at maximum

greediness: 0.9

controllers:
  - feature: height
    weight: 1.0
    sine:
      bpm: 20
      phase: 0

  - feature: width
    weight: 1.0
    sine:
      bpm: 20
      phase: 0

  # - feature: area
  #   weight: 0.8
  #   saw:
  #     bpm: 15
  #     phase: 0        # phase: 180 → descending ramp

  # - feature: aspect_ratio
  #   weight: 0.6
  #   square:
  #     bpm: 8
  #     duty: 0.3       # 30% of period in high (max) state
  #     phase: 0

noise: 0

# Pixel on/off controller ---------------------------------------------------------
# Signal above threshold → frame rendered at full resolution (no pixelation)

# pixel_controller:
#   threshold: 0.70
#   sine:
#     bpm: 3
#     phase: 0

# Pixel size controller -----------------------------------------------------------
# Modulates pixel_size between min_size and max_size over time
# (comment out to use fixed pixel_size above)

pixel_size_controller:
  min_size: 6
  max_size: 16
  sine:
    bpm: 20
    phase: 0

# Representation switching --------------------------------------------------------
# Gate opens a window where an alternative representation is used instead of fluid.
# Sub-signal picks which one. Only active when representation subdirs exist.

# representation_controller:
#   gate_bpm: 4
#   gate_phase: 0
#   gate_threshold: 0.65
#   sub:
#     bpm: 9
#     phase: 0
#     levels:
#       - above: 0.0
#         name: steric

# Timeline segments ---------------------------------------------------------------
# Each segment draws from the specified pool(s) for its duration.
# duration is in beats (converted to seconds using global bpm above).
# framerate: tick notation per-segment (defaults to global framerate).
#   sets the source-frame sampling rate for that segment.
#   explicit fps: overrides framerate for that segment.
# Pools: fluid, steric, steric_no_nodes, active_fluid
# Modes: rhythmic (shape-driven, uses controllers above), shuffle, chronological
# noise sub-config:
#   pct: random insertion — sprinkles N% noise frames at random positions
#   quantize: "1/4" — replaces one frame per musical interval (1/4, 1/8, 1/16 …)
#   (pct and quantize are mutually exclusive)
# Per-segment pixel overrides: pixel_size, pixel_size_controller, pixel_controller
#   pixel_size: 0 disables pixelation entirely for that segment
# When segments is set, duration/mode above are ignored.

segments:
  - name: fluid
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: rhythmic
    pool: [fluid]
    controllers:
      - feature: height
        weight: 1.0
        sine:
          bpm: 10        # slower than the global 20
          phase: 0
      - feature: width
        weight: 1.0
        sine:
          bpm: 10
          phase: 0

  - name: steric_no_nodes_chrono
    duration: 4    # 6 beats = 3s at 120 bpm
    mode: chronological
    pool: [steric_no_nodes]
    noise:
      pool: [steric_no_nodes]
      pct: 0            # ~10% of frames replaced with random fluid frames

  - name: steric_no_nodes_chrono
    duration: 4    # 6 beats = 3s at 120 bpm
    mode: chronological
    pool: [steric_no_nodes]
    noise:
      pool: [fluid]
      quantize: "1/16"

  - name: steric_chrono
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chronological
    pool: [steric]
    noise:
      pool: [fluid]
      pct: 0            # ~10% of frames replaced with random fluid frames

  - name: steric_chrono_blend
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chrono_rep_cycle
    pool: [fluid, steric, steric_no_nodes]

  - name: blend
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: shuffle
    pool: [fluid, steric, steric_no_nodes]


  - name: swimming
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chronological
    pool: [swimming]
    start_pct: 60
    pixel_size_controller:
      min_size: 6
      max_size: 8
      sine:
        bpm: 20
        phase: 0
    noise:
      pool: [fluid]
      pct: 25            # ~10% of frames replaced with random fluid frames

  - name: steric_chrono_2
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chronological
    pool: [steric]
    start_pct: 50
    noise:
      pool: [fluid]
      pct: 0            # ~10% of frames replaced with random fluid frames


  - name: all_reps_chrono_very_cool
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chrono_rep_shuffle   # chrono order, rep chosen randomly at each frame
    pool: [fluid, steric, steric_no_nodes]

  - name: steric_no_nodes_ending_strobe_1
    duration: 4   # 10 beats = 5s at 120 bpm
    start_pct: 80
    mode: chronological
    pool: [steric_no_nodes]
    noise:
      pool: [fluid]
      # pct: 7            # ~10% of frames replaced with random fluid frames
      quantize: "1/8"

  - name: steric_no_nodes_ending_strobe_2
    duration: 4   # 10 beats = 5s at 120 bpm
    start_pct: 90
    mode: chronological
    pool: [steric_no_nodes]
    noise:
      pool: [fluid]
      # pct: 7            # ~10% of frames replaced with random fluid frames
      quantize: "1/16"


  - name: swimming
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chronological
    pool: [swimming]
    start_pct: 80
    pixel_size_controller:
      min_size: 6
      max_size: 8
      sine:
        bpm: 20
        phase: 0
    noise:
      pool: [fluid]
      # pct: 7            # ~10% of frames replaced with random fluid frames
      quantize: "1/2"

  - name: all_reps_chrono
    duration: 8   # 10 beats = 5s at 120 bpm
    mode: chrono_rep_shuffle   # chrono order, rep chosen randomly at each frame
    pool: [fluid, steric, steric_no_nodes]

  - name: active
    duration: 4    # 8 beats = 4s at 120 bpm
    mode: chronological
    pool: [active_fluid]
    # fps: 24                    # source frames cycle at 24fps (non-tick override)
    start_pct: 70
    # noise:
    #   pool: [steric_no_nodes]
    #   # pct: 0
    #   quantize: "1/2"
    pixel_size_controller:     # subtle oscillation for the remaining 3s
      min_size: 4
      max_size: 6
      sine:
        bpm: 2
        phase: 0

  - name: steric_no_nodes_chrono_noised
    duration: 4   # 10 beats = 5s at 120 bpm
    start_pct: 30
    mode: chronological
    pool: [steric_no_nodes]
    noise:
      pool: [fluid]
      # pct: 7            # ~10% of frames replaced with random fluid frames
      quantize: "1/16"

  - name: steric_no_nodes_chrono
    duration: 8   # 10 beats = 5s at 120 bpm
    start_pct: 50
    mode: chronological
    pool: [steric_no_nodes]

  - name: steric_no_nodes_chrono_noised
    duration: 8   # 10 beats = 5s at 120 bpm
    start_pct: 80
    mode: chronological
    pool: [steric_no_nodes]
    noise:
      pool: [fluid]
      # pct: 7            # ~10% of frames replaced with random fluid frames
      quantize: "1/16"
```