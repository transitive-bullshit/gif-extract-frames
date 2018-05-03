# gif-extract-frames

> Extracts frames from GIFs including inter-frame coalescing.

[![NPM](https://img.shields.io/npm/v/gif-extract-frames.svg)](https://www.npmjs.com/package/gif-extract-frames) [![Build Status](https://travis-ci.org/transitive-bullshit/gif-extract-frames.svg?branch=master)](https://travis-ci.org/transitive-bullshit/gif-extract-frames) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Why?

Some GIFs store delta information between frames instead of storing complete frames. Here's an example:

---

Original gif ([source](https://giphy.com/gifs/ycagKBYEmaili)).

![Input gif bubbles](https://raw.githubusercontent.com/transitive-bullshit/gif-extract-frames/master/media/bubbles.gif)

---

5 extracted frames **without** coalescing.

![Example without coalescing](https://raw.githubusercontent.com/transitive-bullshit/gif-extract-frames/master/media/example-without-coalescing.png)

---

5 extracted frames **with** coalescing.

![Example without coalescing](https://raw.githubusercontent.com/transitive-bullshit/gif-extract-frames/master/media/example-with-coalescing.png)

---

## Install

This module requires `node >= 8`.

```bash
npm install --save gif-extract-frames
```

## Usage

```js
const extractFrames = require('gif-extract-frames')

const results = await extractFrames({
  input: './media/bubbles.gif',
  output: 'frame-%d.png'
})
console.log('number of frames', results.shape[0])
```


## API

### extractFrames(opts)

Returns: `Promise<ndarray>`

Returns a modified version of the [ndarray](https://github.com/scijs/ndarray) returned by [get-pixels](https://github.com/scijs/get-pixels).

#### opts.input

Type: `String`
**Required**

Path to a GIF file.

#### opts.output

Type: `String`
Example: `'output/frame-%d.png'`

Optional frame pattern if you want to write each frame to disk. Should contain a `%d` that will be replaced with the frame number (starting at 0).

The resulting [ndarray](https://github.com/scijs/ndarray) will be returned whether or not an `output` is given.

#### opts.coalesce

Type: `Boolean`
Default: `true`

Whether or not to perform inter-frame coalescing.


## Related

- [gifsicle](https://github.com/kohler/gifsicle) - GIF manipulation library capable of *exploding* gifs, but AFAIK does not support frame coalescing when exporting frames.
- [gif-explode](https://github.com/hughsk/gif-explode) - Alternative which uses [gifsicle](https://github.com/kohler/gifsicle) but does not support frame coalescing.
- [omggif](https://github.com/deanm/omggif) - JavaScript GIF encoder & decoder used under the hood.
- [ffmpeg-extract-frames](https://github.com/transitive-bullshit/ffmpeg-extract-frames) - Analogous module for extracting frames from video files.


## License

MIT © [Travis Fischer](https://github.com/transitive-bullshit)
