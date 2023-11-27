import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { YuvProfile } from "./yuvProfile";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";
import { ConverterUtils } from "./converter.utils";
import { RgbConverter } from "./converter.rgb";

export namespace YuvConverter {
  /**
   * Gets Rgb components from Yuv components.
   * @param y The brightness component.
   * @param u The blue-luminance component.
   * @param v The red-luminance component.
   * @returns The Rgb components.
   */
  export function getRgbFromYuv(
    y: number,
    u: number,
    v: number,
    profile: YuvProfile = YuvProfile.BT_470,
  ): number[] {
    const matrix = profile.rgbMatrix;
    const offset = profile.offset;

    const r =
      matrix[0][0] * (y + offset[0]) +
      matrix[0][1] * (u + offset[1]) +
      matrix[0][2] * (v + offset[2]);
    const g =
      matrix[1][0] * (y + offset[0]) +
      matrix[1][1] * (u + offset[1]) +
      matrix[1][2] * (v + offset[2]);
    const b =
      matrix[2][0] * (y + offset[0]) +
      matrix[2][1] * (u + offset[1]) +
      matrix[2][2] * (v + offset[2]);

    return [
      ConverterUtils.roundInt(r * 255.0),
      ConverterUtils.roundInt(g * 255.0),
      ConverterUtils.roundInt(b * 255.0),
    ];
  }

  /**
   * Converts a Yuv color to a Hex color.
   * @param yuv The Yuv color.
   * @returns the Hex color.
   */
  export function YuvToHex(yuv: Yuv): string {
    const rgbs: number[] = getRgbFromYuv(yuv.y, yuv.u, yuv.v);

    return RgbConverter.RgbToHex(new Rgb(rgbs[0], rgbs[1], rgbs[2]));
  }

  /**
   * Converts a Yuv color to a Rgb color.
   * @param yuv The Yuv color.
   * @returns The Rgb color.
   */
  export function YuvToRgb(yuv: Yuv): Rgb {
    const rgbs: number[] = getRgbFromYuv(yuv.y, yuv.u, yuv.v);

    return new Rgb(rgbs[0], rgbs[1], rgbs[2]);
  }

  /**
   * Converts a Yuv color to a Hsl color.
   * @param yuv The Yuv color.
   * @returns The Hsl color.
   */
  export function YuvToHsl(yuv: Yuv): Hsl {
    const rgbs: number[] = getRgbFromYuv(yuv.y, yuv.u, yuv.v);
    const hsls: number[] = RgbConverter.getHslFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsl(hsls[0], hsls[1], hsls[2]);
  }

  /**
   * Converts a Yuv color to a Hsb color.
   * @param yuv The Yuv color.
   * @returns The Hsb color.
   */
  export function YuvToHsb(yuv: Yuv): Hsb {
    const rgbs: number[] = getRgbFromYuv(yuv.y, yuv.u, yuv.v);
    const hsbs: number[] = RgbConverter.getHsbFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsb(hsbs[0], hsbs[1], hsbs[2]);
  }

  /**
   * Converts a Yuv color to a Cmyk color.
   * @param yuv The Yuv color.
   * @returns The Cmyk color.
   */
  export function YuvToCmyk(yuv: Yuv): Cmyk {
    const rgbs: number[] = getRgbFromYuv(yuv.y, yuv.u, yuv.v);
    const cmyks: number[] = RgbConverter.getCmykFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Cmyk(cmyks[0], cmyks[1], cmyks[2], cmyks[3]);
  }

  /**
   * Converts a Yuv color to a CieXyz color.
   * @param yuv The Yuv color.
   * @returns The CieXyz color.
   */
  export function YuvToCieXyz(yuv: Yuv): CieXyz {
    const rgbs: number[] = getRgbFromYuv(yuv.y, yuv.u, yuv.v);
    const cies: number[] = RgbConverter.getCieXyzFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new CieXyz(cies[0], cies[1], cies[2]);
  }
}
