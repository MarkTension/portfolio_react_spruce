# Detecting NaN's in WebGPU

NaNs can sometimes arise in WebGPU / WGSL when doing normalizations or divisions. Most important is setting up guardrails to safely do this, but sometimes it's nice to have an extra check when things _do_ go wrong. 

In WGSL, it's hard to know NaNs are there, because the threads don't fail, and e.g. texture values are presented as 0's.

In other words, a thread with a NaN can turn out 'weird', but the system goes on. Only when enough threads are 'weird' you might notice it.

I prefer my code just to fail, or have a compiler that complains a lot when code is questionable.
It's in the reason I tend to write a lot of asserts in functions, which I was inspired to do more from a conversation between John Carmack and Lex Fridman. 

In WGSL there's no isnan() method.
You could make your own though. After searching for nan in the [WGSL Function Reference on webgpu fundamentals](https://webgpufundamentals.org/webgpu/lessons/webgpu-wgsl-function-reference.html) I found one relevant reference:

```
fn max(e1: T, e2: T) -> T 
```
The documentation states that if one operand is a NaN, the other is returned.

That gives a nice hacky way to at least detect failures at critical places.

You could e.g. write e.g. a red pixel in the corner of your texture, something that you'll see. Or change a buffer value that you can load to the CPU.

```
fn if_nan_write_red_alert(x: f32) -> void {
  let highVal = 1000000.0;
  let x2 = min(x, highVal);
  if (x2 == highVal){
    writeTexture(topleft, red pixel)
  }
}
```
