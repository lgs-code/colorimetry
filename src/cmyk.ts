/**
 * Defines a CMYK (Cyan, Magenta, Yellow, blacK) color.
 */
export class Cmyk {
  private static Min: number = 0;
  private static Max: number = 1;

  private _c: number = Cmyk.Min;
  private _m: number = Cmyk.Min;
  private _y: number = Cmyk.Min;
  private _k: number = Cmyk.Min;

  constructor(cyan: number, magenta: number, yellow: number, black: number) {
    this.c = cyan;
    this.m = magenta;
    this.y = yellow;
    this.k = black;
  }

  /**
   * Gets the Cyan component.
   */
  get c(): number {
    return this._c;
  }

  /**
   * Sets the Cyan component.
   */
  set c(value: number) {
    this._c = value > Cmyk.Max ? Cmyk.Max : value < Cmyk.Min ? Cmyk.Min : value;
  }

  /**
   * Gets the Magenta component.
   */
  get m(): number {
    return this._m;
  }

  /**
   * Sets the Magenta component.
   */
  set m(value: number) {
    this._m = value > Cmyk.Max ? Cmyk.Max : value < Cmyk.Min ? Cmyk.Min : value;
  }

  /**
   * Gets the Yellow component.
   */
  get y(): number {
    return this._y;
  }

  /**
   * Sets the Yellow component.
   */
  set y(value: number) {
    this._y = value > Cmyk.Max ? Cmyk.Max : value < Cmyk.Min ? Cmyk.Min : value;
  }

  /**
   * Gets the Black component.
   */
  get k(): number {
    return this._k;
  }

  /**
   * Sets the Black component.
   */
  set k(value: number) {
    this._k = value > Cmyk.Max ? Cmyk.Max : value < Cmyk.Min ? Cmyk.Min : value;
  }

  equals(obj: Cmyk): boolean {
    return (
      this._c === obj.c &&
      this._m === obj.m &&
      this._y === obj.y &&
      this._k === obj.k
    );
  }
}
