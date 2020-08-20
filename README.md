https://github.com/chiranjeevbitm/Raster-image-to-vector-image

Manual way to do it

Convert any image
magick convert <filename.svg> <ToThisFilename.svg>

Convert image to bitmap (potrace only supports that)
magick convert <filename.jpg> <output.ppm>

Then potrace:
potrace -s output.ppm -o svgout.svg