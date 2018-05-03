'use strict'

const fs = require('fs')
const path = require('path')
const pify = require('pify')
const pump = require('pump-promise')
const getPixels = pify(require('get-pixels'))
const savePixels = require('save-pixels')

const supportedFormats = new Set([
  'jpg',
  'png',
  'gif'
])

module.exports = async (opts) => {
  const {
    input,
    output,
    coalesce = true
  } = opts

  const format = output
    ? path.extname(output).substr(1)
    : undefined

  if (format && !supportedFormats.has(format)) {
    throw new Error(`invalid output format "${format}"`)
  }

  const results = await getPixels(input)
  const { shape } = results

  if (shape.length === 4) {
    // animated gif with multiple frames
    const [
      frames,
      width,
      height,
      channels
    ] = shape

    const numPixelsInFrame = width * height

    for (let i = 0; i < frames; ++i) {
      if (i > 0 && coalesce) {
        const currIndex = results.index(i, 0, 0, 0)
        const prevIndex = results.index(i - 1, 0, 0, 0)

        for (let j = 0; j < numPixelsInFrame; ++j) {
          const curr = currIndex + j * channels

          if (results.data[curr + channels - 1] === 0) {
            const prev = prevIndex + j * channels

            for (let k = 0; k < channels; ++k) {
              results.data[curr + k] = results.data[prev + k]
            }
          }
        }
      }

      if (output) {
        await saveFrame(results.pick(i), format, output.replace('%d', i))
      }
    }
  } else if (output) {
    // non-animated gif with a single frame
    await saveFrame(results, format, output.replace('%d', 0))
  }

  return results
}

function saveFrame (data, format, filename) {
  const stream = savePixels(data, format)
  return pump(stream, fs.createWriteStream(filename))
}
