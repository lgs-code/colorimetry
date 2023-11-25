import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";
import { ConverterUtils } from "./converter.utils";
import { RgbConverter } from "./converter.rgb";

export namespace CmykConverter {
  /**
   * Gets Rgb components from Cmyk components.
   * @param cyan The cyan component.
   * @param magenta The magenta component.
   * @param yellow The yellow component.
   * @param black The black component.
   * @returns The Rgb components.
   */
  export function getRgbFromCmyk(
    cyan: number,
    magenta: number,
    yellow: number,
    black: number,
  ): number[] {
    const red = (1 - cyan) * (1 - black);
    const green = (1 - magenta) * (1 - black);
    const blue = (1 - yellow) * (1 - black);

    return [
      ConverterUtils.roundInt(red * 255.0),
      ConverterUtils.roundInt(green * 255.0),
      ConverterUtils.roundInt(blue * 255.0),
    ];
  }

  /**
   * Converts a Cmyk color to a Hex color.
   * @param cmyk The Cmyk color.
   * @returns the Hex color.
   */
  export function CmykToHex(cmyk: Cmyk): string {
    const rgbs: number[] = getRgbFromCmyk(cmyk.c, cmyk.m, cmyk.y, cmyk.k);

    return RgbConverter.RgbToHex(new Rgb(rgbs[0], rgbs[1], rgbs[2]));
  }

  /**
   * Converts a Cmyk color to a Rgb color.
   * @param cmyk The Cmyk color.
   * @returns The Rgb color.
   */
  export function CmykToRgb(cmyk: Cmyk): Rgb {
    const rgbs: number[] = getRgbFromCmyk(cmyk.c, cmyk.m, cmyk.y, cmyk.k);

    return new Rgb(rgbs[0], rgbs[1], rgbs[2]);
  }

  /**
   * Converts a Cmyk color to a Hsl color.
   * @param cmyk The Cmyk color.
   * @returns The Hsl color.
   */
  export function CmykToHsl(cmyk: Cmyk): Hsl {
    const rgbs: number[] = getRgbFromCmyk(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    const hsls: number[] = RgbConverter.getHslFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsl(hsls[0], hsls[1], hsls[2]);
  }

  /**
   * Converts a Cmyk color to a Hsb color.
   * @param cmyk The Cmyk color.
   * @returns The Hsb color.
   */
  export function CmykToHsb(cmyk: Cmyk): Hsb {
    const rgbs: number[] = getRgbFromCmyk(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    const hsbs: number[] = RgbConverter.getHsbFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Hsb(hsbs[0], hsbs[1], hsbs[2]);
  }

  /**
   * Converts a Cmyk color to a Yuv color.
   * @param cmyk The Cmyk color.
   * @returns The Yuv color.
   */
  export function CmykToYuv(cmyk: Cmyk): Yuv {
    const rgbs: number[] = getRgbFromCmyk(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    const yuvs: number[] = RgbConverter.getYuvFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new Yuv(yuvs[0], yuvs[1], yuvs[2]);
  }

  /**
   * Converts a Cmyk color to a CieXyz color.
   * @param cmyk The Cmyk color.
   * @returns The CieXyz color.
   */
  export function CmykToCieXyz(cmyk: Cmyk): CieXyz {
    const rgbs: number[] = getRgbFromCmyk(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    const cies: number[] = RgbConverter.getCieXyzFromRgb(
      rgbs[0],
      rgbs[1],
      rgbs[2],
    );

    return new CieXyz(cies[0], cies[1], cies[2]);
  }
}
