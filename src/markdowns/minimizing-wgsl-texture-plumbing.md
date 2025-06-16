# On minimizing WGSL / WebGPU texture plumbing

Here's a quick and powerful thing I learned during the development of our aritificial life project/paper from my collaborator [Grisha Szep](https://gszep.com/). 

Buffers are really powerful, because they're easy to read from and write to in any form or size (int32,float32,struct).

Sometimes it's nice to use storage textures though. [Here's](https://webgpufundamentals.org/webgpu/lessons/webgpu-storage-textures.html) a good overview on it. They have built-in performance optimizations (memory layout, texture caching, etc), and when working in 2D, textures are already in the correct domain.

There's some limitations though: A large number of texture formats are available but only certain ones can be used as storage textures.

Not all formats are both READ and WRITEable, The problem is that it's only the 1-channel formats that can do both: r32float, r32sint, and r32uint. 

So the choice when doing textures is: 
- you do a bunch of copying of write textures into read textures. 
- Or you do multiple 1-channel storage textures. 

Both introduce a lot of plumbing, which isn't nice when actively building something. I want my thinking to be on the algorithmic part, not the plumbing, so in the past I'd just opt for storageBuffers instead, and convert to texture only when it's time to render.

### Texture arrays!
The sweet spot to me is using texture arrays. 

In the example below it's an array of 10 1-channel textures.

```
  const storageTextures = device.createTexture({
    usage: GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.COPY_DST,
    label: "storageTextures",
    format: "r32float",
    size: {
      width: textures.size.width,
      height: textures.size.height,
      depthOrArrayLayers: 10,
    },
  });

  const storageTexturesLayout = device.createBindGroupLayout({
    label: "storageTexturesLayout",
    entries: [
      {
        visibility,
        binding: 0,
        storageTexture: {
          access: "read-write",
          format: "r32float",
          viewDimension: "2d-array",
        },
      },
    ]
  })

  const storageTexturesBindGroup = device.createBindGroup({
    label: "storageTexturesBindGroup",
    layout: storageTexturesLayout,
    entries: [
      { binding: 0, resource: storageTextures.createView() },
      ]
    }
  )
```

Then these can be easily read or written to in the shader:
Here we read e.g. the value of one channel into the second channel.


```
@group(0) @binding(0)  
  var storageTextures: texture_storage_2d_array<r32float, read_write>;

C_ONE = 0;
C_TWO = 1;

// reading
let c_one = textureLoad(storageTextures, position, C_ONE).r

//writing
textureStore(storageTextures, p, C_TWO, c_one);
```

It's just so convenient to always have the option to use an extra texture without any additional friction.

Another more real-life example you can find in the specific lightmap implementation [here](https://github.com/webgpu/webgpu-samples/blob/2247bf0e5b095137c2a1b2fac235c94fbb289f28/sample/cornell/radiosity.ts#L59), in the [cornell lightbox](https://webgpu.github.io/webgpu-samples/?sample=cornell)

