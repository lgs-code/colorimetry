import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
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
  export function getRgbFromYuv(y: number, u: number, v: number): number[] {
    const red = y + 1.13983739837398374 * v;
    const green = y - 0.3946517043589703515 * u - 0.5805986066674976801 * v;
    const blue = y + 2.032110091743119266 * u;

    return [
      ConverterUtils.roundInt(red * 255.0),
      ConverterUtils.roundInt(green * 255.0),
      ConverterUtils.roundInt(blue * 255.0),
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
