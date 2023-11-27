import { YuvProfile } from "./yuvProfile";

/**
 * Defines a YUV (Brightness, Blue-Luminance, Red-Luminance) color.
 * @see {@link https://en.wikipedia.org/wiki/Y%E2%80%B2UV}
 */
export class Yuv {
  private _p: YuvProfile = YuvProfile.BT_470;
  private _y: number = 0;
  private _u: number = -YuvProfile.BT_470.uMax;
  private _v: number = -YuvProfile.BT_470.vMax;

  constructor(
    y: number,
    u: number,
    v: number,
    p: YuvProfile = YuvProfile.BT_470,
  ) {
    this._p = p;

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
    this._y = value > 1 ? 1 : value < 0 ? 0 : value;
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
    this._u =
      value > this._p.uMax
        ? this._p.uMax
        : value < this._p.uMin
          ? this._p.uMin
          : value;
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
    this._v =
      value > this._p.vMax
        ? this._p.vMax
        : value < this._p.vMin
          ? this._p.vMin
          : value;
  }

  equals(obj: Yuv): boolean {
    return this._y === obj.y && this._u === obj.u && this._v === obj.v;
  }
}
