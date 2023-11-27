/**
 * Defines a color profile for YUV.
 * @see {@link https://en.wikipedia.org/wiki/Y%E2%80%B2UV}
 * @see {@link https://www.itu.int/dms_pubrec/itu-r/rec/bt/R-REC-BT.601-7-201103-I!!PDF-E.pdf}
 */
export class YuvProfile {
  /**
   * BT.470 color profile.
   */
  static BT_470: YuvProfile = new YuvProfile(
    0.436,
    0.615,
    [
      [0.299, 0.587, 0.114],
      [-0.14713, -0.28886, 0.436],
      [0.615, -0.51499, -0.10001],
    ],
    [
      [1, 0, 1.13983],
      [1, -0.39465, -0.5806],
      [1, 2.03211, 0],
    ],
  );

  /**
   * BT.601 color profile.
   */
  static BT_601: YuvProfile = new YuvProfile(
    0.5,
    0.5,
    [
      [0.299, 0.587, 0.114],
      [-0.168736, -0.331264, 0.5],
      [0.5, -0.418688, -0.081312],
    ],
    [
      [1.1643, 0, 1.596],
      [1.1643, -0.39176, -0.81296],
      [1.1643, 2.01723, 0],
    ],
    [-0.0627, -0.5, -0.5],
  );

  /**
   * BT.709 color profile.
   */
  static BT_709: YuvProfile = new YuvProfile(
    0.436,
    0.615,
    [
      [0.2126, 0.7152, 0.0722],
      [-0.09991, -0.33609, 0.436],
      [0.615, -0.55861, -0.05639],
    ],
    [
      [1, 0, 1.28033],
      [1, -0.21482, -0.38059],
      [1, 2.12798, 0],
    ],
  );

  private _uMax: number;
  private _vMax: number;
  private _yuvMatrix: number[][];
  private _rgbMatrix: number[][];
  private _offset: number[];

  constructor(
    uMax: number,
    vMax: number,
    yuvMatrix: number[][],
    rgbMatrix: number[][],
    offset: number[] = [0, 0, 0],
  ) {
    this._uMax = uMax;
    this._vMax = vMax;
    this._yuvMatrix = yuvMatrix;
    this._rgbMatrix = rgbMatrix;
    this._offset = offset;
  }

  get uMin(): number {
    return -this._uMax;
  }

  get uMax(): number {
    return this._uMax;
  }

  get vMin(): number {
    return -this._vMax;
  }

  get vMax(): number {
    return this._vMax;
  }

  get yuvMatrix(): number[][] {
    return this._yuvMatrix;
  }

  get rgbMatrix(): number[][] {
    return this._rgbMatrix;
  }

  get offset(): number[] {
    return this._offset;
  }
}
