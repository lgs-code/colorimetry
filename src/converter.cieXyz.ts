import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";
import { ConverterUtils } from "./converter.utils";
import { RgbConverter } from "./converter.rgb";

export namespace CieXyzConverter {
  /**
   * Gets Rgb components from CieXyz components.
   * @param x The red component.
   * @param y The green component.
   * @param z The blue component.
   * @returns The Rgb components.
   */
  export function getRgbFromCieXyz(x: number, y: number, z: number): number[] {
    const Clinear: number[] = new Array<number>(3);
    Clinear[0] = x * 3.2406 - y * 1.5372 - z * 0.4986; // red
    Clinear[1] = -x * 0.9689 + y * 1.8758 - z * 0.0415; // green
    Clinear[2] = x * 0.0557 - y * 0.204 + z * 1.057; // blue

    for (let i = 0; i < 3; i++) {
      Clinear[i] =
        Clinear[i] <= 0.0031308
          ? 12.92 * Clinear[i]
          : (1 + 0.055) * Math.pow(Clinear[i], 1.0 / 2.4) - 0.055;
    }

    return [
      ConverterUtils.roundInt(Clinear[0] * 255.0),
      ConverterUtils.roundInt(Clinear[1] * 255.0),
      ConverterUtils.roundInt(Clinear[2] * 255.0),
    ];
  }

  /**
   * Converts a CieXyz color to a Hex color.
   * @param xyz The CieXyz color.
   * @returns the Hex color.
   */
  export function CieXyzToHex(xyz: CieXyz): string {
    const rgbs: number[] = getRgbFromCieXyz(xyz.x, xyz.y, xyz.z);

    return RgbConverter.RgbToHex(new Rgb(rgbs[0], rgbs[1], rgbs[2]));
  }

  /**
   * Converts a CieXyz color to a Rgb color.
   * @param xyz The CieXyz color.
   * @returns The Rgb color.
   */
  export function CieXyzToRgb(xyz: CieXyz): Rgb {
    const rgbs: number[] = getRgbFromCieXyz(xyz.x, xyz.y, xyz.z);

    return new Rgb(rgbs[0], rgbs[1], rgbs[2]);
  }

  /**
   * Converts a CieXyz color to a Hsl color.
   * @param xyz The CieXyz color.
   * @returns The Hsl color.
   */
  export function CieXyzToHsl(xyz: CieXyz): Hsl {
    const rgbs: number[] = getRgbFromCieXyz(xyz.x, xyz.y, xyz.z);
    const hsls: number[] = RgbConverter.getHslFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsl(hsls[0], hsls[1], hsls[2]);
  }

  /**
   * Converts a CieXyz color to a Hsb color.
   * @param xyz The CieXyz color.
   * @returns The Hsb color.
   */
  export function CieXyzToHsb(xyz: CieXyz): Hsb {
    const rgbs: number[] = getRgbFromCieXyz(xyz.x, xyz.y, xyz.z);
    const hsbs: number[] = RgbConverter.getHsbFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsb(hsbs[0], hsbs[1], hsbs[2]);
  }

  /**
   * Converts a CieXyz color to a Cmyk color.
   * @param xyz The CieXyz color.
   * @returns The Cmyk color.
   */
  export function CieXyzToCmyk(xyz: CieXyz): Cmyk {
    const rgbs: number[] = getRgbFromCieXyz(xyz.x, xyz.y, xyz.z);
    const cmyks: number[] = RgbConverter.getCmykFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Cmyk(cmyks[0], cmyks[1], cmyks[2], cmyks[3]);
  }

  /**
   * Converts a CieXyz color to a Yuv color.
   * @param xyz The CieXyz color.
   * @returns The Yuv color.
   */
  export function CieXyzToYuv(xyz: CieXyz): Yuv {
    const rgbs: number[] = getRgbFromCieXyz(xyz.x, xyz.y, xyz.z);
    const yuvs: number[] = RgbConverter.getYuvFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Yuv(yuvs[0], yuvs[1], yuvs[2]);
  }
}
