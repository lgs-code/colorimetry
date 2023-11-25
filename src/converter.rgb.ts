import { Rgb } from "./rgb";
import { Hsb } from "./hsb";
import { Hsl } from "./hsl";
import { Cmyk } from "./cmyk";
import { Yuv } from "./yuv";
import { CieXyz } from "./cieXyz";

export namespace RgbConverter {
  function padHex(value: number): string {
    return value.toString(16).padStart(2, "0");
  }

  /**
   * Converts a Rgb color to a Hex color.
   * @param rgb The Rgb color.
   * @returns the Hex color.
   */
  export function RgbToHex(rgb: Rgb): string {
    return `#${padHex(rgb.r)}${padHex(rgb.g)}${padHex(rgb.b)}`;
  }

  /**
   * Gets Hsb components from Rgb components.
   * @param red The red component.
   * @param green The green component.
   * @param blue The blue component.
   * @returns The Hsb components.
   */
  export function getHsbFromRgb(
    red: number,
    green: number,
    blue: number,
  ): number[] {
    const r = red / 255.0;
    const g = green / 255.0;
    const b = blue / 255.0;

    const max = Math.max(r, Math.max(g, b));
    const min = Math.min(r, Math.min(g, b));

    let h = 0.0;
    if (max == r && g >= b) {
      h = (60 * (g - b)) / (max - min);
    } else if (max == r && g < b) {
      h = (60 * (g - b)) / (max - min) + 360;
    } else if (max == g) {
      h = (60 * (b - r)) / (max - min) + 120;
    } else if (max == b) {
      h = (60 * (r - g)) / (max - min) + 240;
    }

    const s = max == 0 ? 0.0 : 1.0 - min / max;

    return [h, s, max];
  }

  /**
   * Converts a Rgb color to a Hsb color.
   * @param rgb The Rgb color.
   * @returns The Hsb color.
   */
  export function RgbToHsb(rgb: Rgb): Hsb {
    const values: number[] = getHsbFromRgb(rgb.r, rgb.g, rgb.b);

    return new Hsb(values[0], values[1], values[2]);
  }

  /**
   * Gets Hsl components from Rgb components.
   * @param red The red component.
   * @param green The green component.
   * @param blue The blue component.
   * @returns The Hsl components.
   */
  export function getHslFromRgb(
    red: number,
    green: number,
    blue: number,
  ): number[] {
    // normalize red, green, blue values
    const r = red / 255.0;
    const g = green / 255.0;
    const b = blue / 255.0;

    const max = Math.max(r, Math.max(g, b));
    const min = Math.min(r, Math.min(g, b));

    let h = 0,
      s = 0,
      l = 0;

    // hue
    if (max == min) {
      h = 0; // undefined
    } else if (max == r && g >= b) {
      h = (60.0 * (g - b)) / (max - min);
    } else if (max == r && g < b) {
      h = (60.0 * (g - b)) / (max - min) + 360.0;
    } else if (max == g) {
      h = (60.0 * (b - r)) / (max - min) + 120.0;
    } else if (max == b) {
      h = (60.0 * (r - g)) / (max - min) + 240.0;
    }

    // luminance
    l = (max + min) / 2.0;

    // saturation
    if (l == 0 || max == min) {
      s = 0;
    } else if (0 < l && l <= 0.5) {
      s = (max - min) / (max + min);
    } else if (l > 0.5) {
      s = (max - min) / (2 - (max + min)); //(max-min > 0)?
    }

    return [h, s, l];
  }

  /**
   * Converts a Rgb color to a Hsl color.
   * @param rgb The Rgb color.
   * @returns The Hsl color.
   */
  export function RgbToHsl(rgb: Rgb): Hsl {
    const values: number[] = getHslFromRgb(rgb.r, rgb.g, rgb.b);

    return new Hsl(values[0], values[1], values[2]);
  }

  /**
   * Gets Cmyk components from Rgb components.
   * @param red The red component.
   * @param green The green component.
   * @param blue The blue component.
   * @returns The Cmyk components.
   */
  export function getCmykFromRgb(
    red: number,
    green: number,
    blue: number,
  ): number[] {
    // normalizes red, green, blue values
    const c = (255 - red) / 255;
    const m = (255 - green) / 255;
    const y = (255 - blue) / 255;

    const k = Math.min(c, Math.min(m, y));

    if (k == 1.0) {
      return [0, 0, 0, 1];
    }

    return [(c - k) / (1 - k), (m - k) / (1 - k), (y - k) / (1 - k), k];
  }

  /**
   * Converts a Rgb color to a Cmyk color.
   * @param rgb The Rgb color.
   * @returns The Cmyk color.
   */
  export function RgbToCmyk(rgb: Rgb): Cmyk {
    const values: number[] = getCmykFromRgb(rgb.r, rgb.g, rgb.b);

    return new Cmyk(values[0], values[1], values[2], values[3]);
  }

  /**
   * Gets Yuv components from Rgb components.
   * @param red The red component.
   * @param green The green component.
   * @param blue The blue component.
   * @returns The Yuv components.
   */
  export function getYuvFromRgb(
    red: number,
    green: number,
    blue: number,
  ): number[] {
    // normalizes red, green, blue values
    const r = red / 255.0;
    const g = green / 255.0;
    const b = blue / 255.0;

    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const u = -0.14713 * r - 0.28886 * g + 0.436 * b;
    const v = 0.615 * r - 0.51499 * g - 0.10001 * b;

    return [y, u, v];
  }

  /**
   * Converts a Rgb color to a Yuv color.
   * @param rgb The Rgb color.
   * @returns The Yuv color.
   */
  export function RgbToYuv(rgb: Rgb): Yuv {
    const values: number[] = getYuvFromRgb(rgb.r, rgb.g, rgb.b);

    return new Yuv(values[0], values[1], values[2]);
  }

  /**
   * Gets CieXyz components from Rgb components.
   * @param red The red component.
   * @param green The green component.
   * @param blue The blue component.
   * @returns The CieXyz components.
   */
  export function getCieXyzFromRgb(
    red: number,
    green: number,
    blue: number,
  ): number[] {
    // normalize red, green, blue values
    const rLinear = red / 255.0;
    const gLinear = green / 255.0;
    const bLinear = blue / 255.0;

    // convert to a sRGB form
    const r =
      rLinear > 0.04045
        ? Math.pow((rLinear + 0.055) / (1 + 0.055), 2.2)
        : rLinear / 12.92;
    const g =
      gLinear > 0.04045
        ? Math.pow((gLinear + 0.055) / (1 + 0.055), 2.2)
        : gLinear / 12.92;
    const b =
      bLinear > 0.04045
        ? Math.pow((bLinear + 0.055) / (1 + 0.055), 2.2)
        : bLinear / 12.92;

    return [
      r * 0.4124 + g * 0.3576 + b * 0.1805,
      r * 0.2126 + g * 0.7152 + b * 0.0722,
      r * 0.0193 + g * 0.1192 + b * 0.9505,
    ];
  }

  /**
   * Converts a Rgb color to a CieXyz color.
   * @param rgb The Rgb color.
   * @returns The CieXyz color.
   */
  export function RgbToCieXyz(rgb: Rgb): CieXyz {
    const values: number[] = getCieXyzFromRgb(rgb.r, rgb.g, rgb.b);

    return new CieXyz(values[0], values[1], values[2]);
  }
}
