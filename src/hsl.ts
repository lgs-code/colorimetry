/**
 * Defines a HSL (Hue, Saturation, Lightness) color.
 */
export class Hsl {
  private static Min: number = 0;
  private static Max: number = 1;
  private static HueMin: number = 0;
  private static HueMax: number = 360;

  private _h: number = Hsl.HueMin;
  private _s: number = Hsl.Min;
  private _l: number = Hsl.Min;

  constructor(hue: number, saturation: number, lightness: number) {
    this.h = hue;
    this.s = saturation;
    this.l = lightness;
  }

  /**
   * Gets the Hue component.
   */
  get h(): number {
    return this._h;
  }

  /**
   * Sets the Hue component.
   */
  set h(value: number) {
    this._h =
      value > Hsl.HueMax ? Hsl.HueMax : value < Hsl.HueMin ? Hsl.HueMin : value;
  }

  /**
   * Gets the Saturation component.
   */
  get s(): number {
    return this._s;
  }

  /**
   * Sets the Saturation component.
   */
  set s(value: number) {
    this._s = value > Hsl.Max ? Hsl.Max : value < Hsl.Min ? Hsl.Min : value;
  }

  /**
   * Gets the Lightness component.
   */
  get l(): number {
    return this._l;
  }

  /**
   * Sets the Lightness component.
   */
  set l(value: number) {
    this._l = value > Hsl.Max ? Hsl.Max : value < Hsl.Min ? Hsl.Min : value;
  }

  equals(obj: Hsl): boolean {
    return this._h === obj.h && this._s === obj.s && this._l === obj.l;
  }
}
