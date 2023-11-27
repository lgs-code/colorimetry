/**
 * Defines a HSB (Hue, Saturation, Brightness) color.
 */
export class Hsb {
  private static Min: number = 0;
  private static Max: number = 1;
  private static HueMin: number = 0;
  private static HueMax: number = 360;

  private _h: number = Hsb.HueMin;
  private _s: number = Hsb.Min;
  private _b: number = Hsb.Min;

  constructor(hue: number, saturation: number, brightness: number) {
    this.h = hue;
    this.s = saturation;
    this.b = brightness;
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
      value > Hsb.HueMax ? Hsb.HueMax : value < Hsb.HueMin ? Hsb.HueMin : value;
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
    this._s = value > Hsb.Max ? Hsb.Max : value < Hsb.Min ? Hsb.Min : value;
  }

  /**
   * Gets the Brightness component.
   */
  get b(): number {
    return this._b;
  }

  /**
   * Sets the Brightness component.
   */
  set b(value: number) {
    this._b = value > Hsb.Max ? Hsb.Max : value < Hsb.Min ? Hsb.Min : value;
  }

  equals(obj: Hsb): boolean {
    return this._h === obj.h && this._s === obj.s && this._b === obj.b;
  }
}
