# My favorite webgpu random function

I thought it was worth sharing this for its value, but also understanding the implementation gave me a more intimate understanding of some fundamental CS concepts: hashing, bitwise casting, and 32bit number layouts.

### What I did before
The quickest and most prevalent way to get random values that are roughly uniform is using this fraction and sinus option with a random seed as input:

```
y = fract(sin(x)*43758.5453123);
```

Book of shaders has a [great piece](https://thebookofshaders.com/10/) on random numbers, and starts off with this method as well.

Density is slightly higher at the center though. I can encourage you to play around with the interactive function and see what happens with different input values.

Also, introducing quite high values of the seed above 1M results in artifacts because of precision errors in the sine function. These high seeds are not uncommon in my simulations: e.g. when using the particle index. It's preventable, but introduces more mental friction: For the basic operations I want it to perform at ceiling level, so I know that when something is wrong, the cause is not in the set of basic operations.

### The alternative
Looking for an alternative, I found an interesting approach I liked [on stack overflow](https://stackoverflow.com/a/17479300/7528024). Credits to the user called 'Spatial'. The implementation used a hashing function and was hacked together in GLSL.

What I appreciated was fully uncoupling from mathematical relationships by shuffling bits around with a hashing function instead.

The result converted to WGSL looks like this:

```
// A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm for u32.
fn hash_u32(x_in: u32) -> u32 {
    var x = x_in;
    x += (x << 10u);
    x ^= (x >> 6u);
    x += (x << 3u);
    x ^= (x >> 11u);
    x += (x << 15u);
    return x;
}

// Construct a float with half-open range [0:1] using low 23 bits.
// All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
fn float_construct_from_u32(m_in: u32) -> f32 {
    let ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
    let ieeeOne = 0x3F800000u;      // 1.0 in IEEE binary32

    var m = m_in;
    m &= ieeeMantissa;              // Keep only mantissa bits (fractional part)
    m |= ieeeOne;                   // Add fractional part to 1.0

    let f = bitcast<f32>(m);        // Range [1:2]
    return f - 1.0;                 // Range [0:1]
}

// Pseudo-random value in half-open range [0:1] from a f32 seed.
fn random_uniform(seed: f32) -> f32 {
    return float_construct_from_u32(hash_u32(bitcast<u32>(seed)));
}
```

Roughly it's doing the following:
- Bitcast the float to u32: bascially keep the same bits, but use u32 which is ideal for bitwise operations (no sign, no fractional).
- Hash the u32 with the hashing function: Do a number of bitwise operations to fully shuffle the bits around.
- Reconstruct the u32 into a float: after shuffling the bits around in the u32 layout, it's still representing a floating point (from bitcasting). We take only the mantissa part of the 32bit sequence by applying a bitmask. For layout reference:
```
IEEE-754 32-bit float layout:
[sign bit (1)] [exponent (8)] [mantissa (23)]
```
Then it converts the mantissa to the fractional (The part after the decimal point) with a bitcast back to f32.

Happy hacking