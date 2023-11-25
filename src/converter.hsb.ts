import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";
import { ConverterUtils } from "./converter.utils";
import { RgbConverter } from "./converter.rgb";

export namespace HsbConverter {
  /**
   * Gets Rgb components from Hsb components.
   * @param hue The hue component.
   * @param saturation The saturation component.
   * @param brightness The brightness component.
   * @returns The Rgb components.
   */
  export function getRgbFromHsb(
    hue: number,
    saturation: number,
    brightness: number,
  ): number[] {
    if (saturation === 0) {
      // achromatic color (gray scale)
      return [
        ConverterUtils.roundInt(brightness * 255.0),
        ConverterUtils.roundInt(brightness * 255.0),
        ConverterUtils.roundInt(brightness * 255.0),
      ];
    }

    // the color wheel consists of 6 sectors
    // Figure out which sector you're in
    const sectorPos = hue / 60.0;
    const sectorNumber = parseInt(`${Math.floor(sectorPos)}`);
    // get the fractional part of the sector
    const fractionalSector = sectorPos - sectorNumber;

    // calculate values for the three axes of the color
    const p = brightness * (1.0 - saturation);
    const q = brightness * (1.0 - saturation * fractionalSector);
    const t = brightness * (1.0 - saturation * (1 - fractionalSector));

    let r = 0;
    let g = 0;
    let b = 0;

    // assign the fractional colors to r, g, and b based on the sector
    // the angle is in.
    switch (sectorNumber) {
      case 0:
        r = brightness;
        g = t;
        b = p;
        break;
      case 1:
        r = q;
        g = brightness;
        b = p;
        break;
      case 2:
        r = p;
        g = brightness;
        b = t;
        break;
      case 3:
        r = p;
        g = q;
        b = brightness;
        break;
      case 4:
        r = t;
        g = p;
        b = brightness;
        break;
      case 5:
        r = brightness;
        g = p;
        b = q;
        break;
    }

    return [
      ConverterUtils.roundInt(r * 255.0),
      ConverterUtils.roundInt(g * 255.0),
      ConverterUtils.roundInt(b * 255.0),
    ];
  }

  /**
   * Converts a Hsb color to a Hex color.
   * @param hsb The Hsb color.
   * @returns the Hex color.
   */
  export function HsbToHex(hsb: Hsb): string {
    const rgbs: number[] = getRgbFromHsb(hsb.h, hsb.s, hsb.b);

    return RgbConverter.RgbToHex(new Rgb(rgbs[0], rgbs[1], rgbs[2]));
  }

  /**
   * Converts a Hsb color to a Rgb color.
   * @param hsb The Hsb color.
   * @returns The Rgb color.
   */
  export function HsbToRgb(hsb: Hsb): Rgb {
    const rgbs: number[] = getRgbFromHsb(hsb.h, hsb.s, hsb.b);

    return new Rgb(rgbs[0], rgbs[1], rgbs[2]);
  }

  /**
   * Converts a Hsb color to a Hsl color.
   * @param hsb The Hsb color.
   * @returns The Hsl color.
   */
  export function HsbToHsl(hsb: Hsb): Hsl {
    const rgbs: number[] = getRgbFromHsb(hsb.h, hsb.s, hsb.b);
    const hsls: number[] = RgbConverter.getHslFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsl(hsls[0], hsls[1], hsls[2]);
  }

  /**
   * Converts a Hsb color to a Cmyk color.
   * @param hsb The Hsb color.
   * @returns The Cmyk color.
   */
  export function HsbToCmyk(hsb: Hsb): Cmyk {
    const rgbs: number[] = getRgbFromHsb(hsb.h, hsb.s, hsb.b);
    const cmyks: number[] = RgbConverter.getCmykFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Cmyk(cmyks[0], cmyks[1], cmyks[2], cmyks[3]);
  }

  /**
   * Converts a Hsb color to a Yuv color.
   * @param hsb The Hsb color.
   * @returns The Yuv color.
   */
  export function HsbToYuv(hsb: Hsb): Yuv {
    const rgbs: number[] = getRgbFromHsb(hsb.h, hsb.s, hsb.b);
    const yuvs: number[] = RgbConverter.getYuvFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Yuv(yuvs[0], yuvs[1], yuvs[2]);
  }

  /**
   * Converts a Hsb color to a CieXyz color.
   * @param hsb The Hsb color.
   * @returns The CieXyz color.
   */
  export function HsbToCieXyz(hsb: Hsb): CieXyz {
    const rgbs: number[] = getRgbFromHsb(hsb.h, hsb.s, hsb.b);
    const cies: number[] = RgbConverter.getCieXyzFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new CieXyz(cies[0], cies[1], cies[2]);
  }
}
