# colorimetry

TypeScript library for color conversion between multiple formats.

## Usage

This library supports the following formats :

- (s)RGB
- HSL
- HSB (or HSV)
- CMYK
- YUV (BT.470, BT.601, BT.709 profiles)
- CIE XYZ

### Converters

To convert from a format to another, you can use the appropriate "converter" to do so :

- RgbConverter,
- HslConverter,
- HsbConverter,
- CmykConverter,
- YuvConverter,
- CieXyzConverter

These are not classes, but namespaces regrouping conversion functions.

### Quick example: (s)RGB to HSB

Image you'd like to convert a RGB value to HSB, you can use the following code:

    import { Rgb, RgbConverter } from "@lgs-code/colorimetry";

    const rgb = new Rgb(252, 186, 3);
    const hsb = RgbConverter.RgbToHsb(rgb);

    // will output "44.10°, 98.81%, 98.82%"
    console.log(`${hsb.h.toFixed(2)}°, ${(hsb.s * 100).toFixed(2)}%, ${(hsb.b * 100).toFixed(2)}%`);

The same principle apply to any conversion you'd like to perform.

## Documentation

For the list of of available classes and features, please review the documentation [here](https://lgs-code.github.io/colorimetry/).

## Tools

The tools used in this library are :

- [TypeScript](https://www.typescriptlang.org/) => mostly for configuring compiler options
- [ESLint](https://eslint.org/docs/latest/) => code rules and formatters
- [Prettier](https://prettier.io/) => code formatting rules
- [Rollup](https://rollupjs.org/) => to create bundles in various format like UMD, Common Js and ES Modules
- [Jest]() => writing and executing unit tests
- [TypeDoc](https://typedoc.org/) => generating the documentation

## Contribution

Feel free to contribute by adding new features or color formats :)
