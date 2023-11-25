/**
 * Defines a RGB (Red Green, Blue) color.
 */
export class Rgb {
  private static Min: number = 0;
  private static Max: number = 255;

  private _r: number = Rgb.Min;
  private _g: number = Rgb.Min;
  private _b: number = Rgb.Min;

  constructor(red: number, green: number, blue: number) {
    this.r = red;
    this.b = blue;
    this.g = green;
  }

  /**
   * Gets the Red component.
   */
  get r(): number {
    return this._r;
  }

  /**
   * Sets the Red component.
   */
  set r(value: number) {
    this._r = value > Rgb.Max ? Rgb.Max : value < Rgb.Min ? Rgb.Min : value;
  }

  /**
   * Gets the Green component.
   */
  get g(): number {
    return this._g;
  }

  /**
   * Sets the Green component.
   */
  set g(value: number) {
    this._g = value > Rgb.Max ? Rgb.Max : value < Rgb.Min ? Rgb.Min : value;
  }

  /**
   * Gets the Blue component.
   */
  get b(): number {
    return this._b;
  }

  /**
   * Sets the Blue component.
   */
  set b(value: number) {
    this._b = value > Rgb.Max ? Rgb.Max : value < Rgb.Min ? Rgb.Min : value;
  }

  equals(obj: Rgb): boolean {
    return this._r === obj.r && this._g === obj.g && this._b === obj.b;
  }
}
