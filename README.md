## Bitmap tracer

**Credit to this cool repo**
[Potrace (JS)](https://github.com/tooolbox/node-potrace)

### Manually converting
[Raster image to vector](https://github.com/chiranjeevbitm/Raster-image-to-vector-image)

Convert any image
```magick convert <filename.svg> <ToThisFilename.svg>```

Convert image to bitmap (potrace only supports that)
```magick convert <filename.jpg> <output.ppm>```

Potrace
```potrace -s output.ppm -o svgout.svg```