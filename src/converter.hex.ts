import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";
import { RgbConverter } from "./converter.rgb";

export namespace HexConverter {
  /**
   * Converts a Hex color to Rgb color.
   * @param hex The hex color.
   * @returns the Rgb color.
   */
  export function HexToRgb(hex: string): Rgb {
    const radix: number = 16;

    if (hex.length === 4) {
      return new Rgb(
        parseInt(`${hex[1]}${hex[1]}`, radix),
        parseInt(`${hex[2]}${hex[2]}`, radix),
        parseInt(`${hex[3]}${hex[3]}`, radix),
      );
    }

    return new Rgb(
      parseInt(`${hex.substring(1, 2)}`, radix),
      parseInt(`${hex.substring(3, 2)}`, radix),
      parseInt(`${hex.substring(5, 2)}`, radix),
    );
  }

  /**
   * Converts a Hex color to Hsb color.
   * @param hex The hex color.
   * @returns the Hsb color.
   */
  export function HexToHsb(hex: string): Hsb {
    return RgbConverter.RgbToHsb(HexToRgb(hex));
  }

  /**
   * Converts a Hex color to Hsl color.
   * @param hex The hex color.
   * @returns the Hsl color.
   */
  export function HexToHsl(hex: string): Hsl {
    return RgbConverter.RgbToHsl(HexToRgb(hex));
  }

  /**
   * Converts a Hex color to Cmyk color.
   * @param hex The hex color.
   * @returns the Cmyk color.
   */
  export function HexToCmyk(hex: string): Cmyk {
    return RgbConverter.RgbToCmyk(HexToRgb(hex));
  }

  /**
   * Converts a Hex color to Yuv color.
   * @param hex The hex color.
   * @returns the Yuv color.
   */
  export function HexToYuv(hex: string): Yuv {
    return RgbConverter.RgbToYuv(HexToRgb(hex));
  }

  /**
   * Converts a Hex color to CieXyz color.
   * @param hex The hex color.
   * @returns the CieXyz color.
   */
  export function HexToCieXyz(hex: string): CieXyz {
    return RgbConverter.RgbToCieXyz(HexToRgb(hex));
  }
}
