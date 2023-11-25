/**
 * Defines a YUV (Brightness, Blue-Luminance, Red-Luminance) color.
 */
export class Yuv {
  private static YMin: number = 0;
  private static YMax: number = 1;
  private static UMin: number = -0.436;
  private static UMax: number = 0.436;
  private static VMin: number = -0.615;
  private static VMax: number = 0.615;

  private _y: number = Yuv.YMin;
  private _u: number = Yuv.UMin;
  private _v: number = Yuv.VMin;

  constructor(y: number, u: number, v: number) {
    this.y = y;
    this.u = u;
    this.v = v;
  }

  /**
   * Gets the Brightness component.
   */
  get y(): number {
    return this._y;
  }

  /**
   * Sets the Brightness component.
   */
  set y(value: number) {
    this._y = value > Yuv.YMax ? Yuv.YMax : value < Yuv.YMin ? Yuv.YMin : value;
  }

  /**
   * Gets the Blue-Luminance component.
   */
  get u(): number {
    return this._u;
  }

  /**
   * Sets the Blue-Luminance component.
   */
  set u(value: number) {
    this._u = value > Yuv.UMax ? Yuv.UMax : value < Yuv.UMin ? Yuv.UMin : value;
  }

  /**
   * Gets the Red-Luminance component.
   */
  get v(): number {
    return this._v;
  }

  /**
   * Sets the Red-Luminance component.
   */
  set v(value: number) {
    this._v = value > Yuv.VMax ? Yuv.VMax : value < Yuv.VMin ? Yuv.VMin : value;
  }

  equals(obj: Yuv): boolean {
    return this._y === obj.y && this._u === obj.u && this._v === obj.v;
  }
}
