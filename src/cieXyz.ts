/**
 * Defines a CIE XYZ  color.
 */
export class CieXyz {
  private static Min: number = 0;
  /**
   * The CIE D65 (white) point.
   */
  public static D65: number[] = [0.9505, 1.0, 1.089];

  private _w: number[];
  private _x: number = CieXyz.Min;
  private _y: number = CieXyz.Min;
  private _z: number = CieXyz.Min;

  constructor(x: number, y: number, z: number, w: number[] = CieXyz.D65) {
    this._w = [...w];
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Gets the Red component.
   */
  get x(): number {
    return this._x;
  }

  /**
   * Sets the Red component.
   */
  set x(value: number) {
    this._x =
      value > this._w[0] ? this._w[0] : value < CieXyz.Min ? CieXyz.Min : value;
  }

  /**
   * Gets the Green component.
   */
  get y(): number {
    return this._y;
  }

  /**
   * Sets the Green component.
   */
  set y(value: number) {
    this._y =
      value > this._w[1] ? this._w[1] : value < CieXyz.Min ? CieXyz.Min : value;
  }

  /**
   * Gets the Blue component.
   */
  get z(): number {
    return this._z;
  }

  /**
   * Sets the Blue component.
   */
  set z(value: number) {
    this._z =
      value > this._w[2] ? this._w[2] : value < CieXyz.Min ? CieXyz.Min : value;
  }

  equals(obj: CieXyz): boolean {
    return this._x === obj.y && this._y === obj.y && this._z === obj.z;
  }
}
