# biggest workflow gripe in pytorch resolved
When I'm developing/debugging in pytorch, for years, I encounter the following annoyance all the time:
A debug session is open, I highlight a line or number of lines and hit CMD+SHIFT+E to evaluate and show the expression in the console. 

And what does it show? The entire fricking tensor.

Why? Who cares about that? Just give me the tensor shape! 
Shape is all I need. It's visual, like when I work out a problem on paper.

So now I end up typing tensor.shape all the time, and that's kind of annoying.

JAX got it right though. A tensor eval there is like:
```
JitTracer<float32[50, 3]>
```
All I need!

So what I do now sometimes is this wonderfully hacky hotfix, which is also quite satisfying.
([thank you pytorch forum](https://discuss.pytorch.org/t/tensor-repr-in-debug-should-show-shape-first/147230/5))
Just add it to the top of your script.

```
normal_repr = torch.Tensor.__repr__
torch.Tensor.__repr__ = lambda self: f"{normal_repr(self)}\n {self.shape}"
```

I've been okay with this annoyance for years. Probably because I like pytorch most of the time.
A colleague once shared that he liked pytorch so much because he came from Tensorflow 1.
I could really identify with that. 

Still, it's good to have these little epiphanies; realizing that something is annoying and actually doing something about it.
