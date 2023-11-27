import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { YuvProfile } from "./yuvProfile";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";
import { ConverterUtils } from "./converter.utils";
import { RgbConverter } from "./converter.rgb";

export namespace HslConverter {
  /**
   * Gets Rgb components from Hsl components.
   * @param hue The hue component.
   * @param saturation The saturation component.
   * @param luminance The luminance component.
   * @returns The Rgb components.
   */
  export function getRgbFromHsl(
    hue: number,
    saturation: number,
    luminance: number,
  ): number[] {
    if (saturation === 0) {
      // achromatic color (gray scale)
      return [
        ConverterUtils.roundInt(luminance * 255.0),
        ConverterUtils.roundInt(luminance * 255.0),
        ConverterUtils.roundInt(luminance * 255.0),
      ];
    }

    const q =
      luminance < 0.5
        ? luminance * (1.0 + saturation)
        : luminance + saturation - luminance * saturation;
    const p = 2.0 * luminance - q;

    const Hk = hue / 360.0;
    const T: number[] = new Array<number>(3);
    T[0] = Hk + 1.0 / 3.0; // Tr
    T[1] = Hk; // Tb
    T[2] = Hk - 1.0 / 3.0; // Tg

    for (let i = 0; i < 3; i++) {
      if (T[i] < 0) T[i] += 1.0;
      if (T[i] > 1) T[i] -= 1.0;

      if (T[i] * 6 < 1) {
        T[i] = p + (q - p) * 6.0 * T[i];
      } else if (T[i] * 2.0 < 1) {
        //(1.0/6.0)<=T[i] && T[i]<0.5
        T[i] = q;
      } else if (T[i] * 3.0 < 2) {
        // 0.5<=T[i] && T[i]<(2.0/3.0)
        T[i] = p + (q - p) * (2.0 / 3.0 - T[i]) * 6.0;
      } else T[i] = p;
    }

    return [
      ConverterUtils.roundInt(T[0] * 255.0),
      ConverterUtils.roundInt(T[1] * 255.0),
      ConverterUtils.roundInt(T[2] * 255.0),
    ];
  }

  /**
   * Converts a Hsl color to a Hex color.
   * @param hsb The Hsl color.
   * @returns the Hex color.
   */
  export function HslToHex(hsl: Hsl): string {
    const rgbs: number[] = getRgbFromHsl(hsl.h, hsl.s, hsl.l);

    return RgbConverter.RgbToHex(new Rgb(rgbs[0], rgbs[1], rgbs[2]));
  }

  /**
   * Converts a Hsl color to a Rgb color.
   * @param hsl The Hsl color.
   * @returns The Rgb color.
   */
  export function HslToRgb(hsl: Hsl): Rgb {
    const rgbs: number[] = getRgbFromHsl(hsl.h, hsl.s, hsl.l);

    return new Rgb(rgbs[0], rgbs[1], rgbs[2]);
  }

  /**
   * Converts a Hsl color to a Hsb color.
   * @param hsl The Hsl color.
   * @returns The Hsb color.
   */
  export function HslToHsb(hsl: Hsl): Hsb {
    const rgbs: number[] = getRgbFromHsl(hsl.h, hsl.s, hsl.l);
    const hsbs: number[] = RgbConverter.getHsbFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsb(hsbs[0], hsbs[1], hsbs[2]);
  }

  /**
   * Converts a Hsl color to a Cmyk color.
   * @param hsl The Hsl color.
   * @returns The Cmyk color.
   */
  export function HslToCmyk(hsl: Hsl): Cmyk {
    const rgbs: number[] = getRgbFromHsl(hsl.h, hsl.s, hsl.l);
    const cmyks: number[] = RgbConverter.getCmykFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Cmyk(cmyks[0], cmyks[1], cmyks[2], cmyks[3]);
  }

  /**
   * Converts a Hsl color to a Yuv color.
   * @param hsl The Hsl color.
   * @param profile The Yuv color profile.
   * @returns The Yuv color.
   */
  export function HslToYuv(
    hsl: Hsl,
    profile: YuvProfile = YuvProfile.BT_470,
  ): Yuv {
    const rgbs: number[] = getRgbFromHsl(hsl.h, hsl.s, hsl.l);
    const yuvs: number[] = RgbConverter.getYuvFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
      profile,
    );

    return new Yuv(yuvs[0], yuvs[1], yuvs[2]);
  }

  /**
   * Converts a Hsl color to a CieXyz color.
   * @param hsl The Hsl color.
   * @returns The CieXyz color.
   */
  export function HslToCieXyz(hsl: Hsl): CieXyz {
    const rgbs: number[] = getRgbFromHsl(hsl.h, hsl.s, hsl.l);
    const cies: number[] = RgbConverter.getCieXyzFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new CieXyz(cies[0], cies[1], cies[2]);
  }
}
