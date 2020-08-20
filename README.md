## Bitmap tracer

**Credit to this cool NPM package**
[Potrace (JS)](https://www.npmjs.com/package/potrace)

### Manually converting
[Raster image to vector](https://github.com/chiranjeevbitm/Raster-image-to-vector-image)

**Convert any image**
```magick convert <filename.svg> <ToThisFilename.svg>```

**Convert image to bitmap (potrace only supports that)**
```magick convert <filename.jpg> <output.ppm>```

**Potrace**
```potrace -s output.ppm -o svgout.svg```