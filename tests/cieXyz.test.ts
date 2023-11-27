import { log } from "console";
import { CieXyz, CieXyzConverter } from "../build/index";

describe("CieXyz", () => {
  it("creates a new instance", () => {
    const xyz = new CieXyz(0.5, 0.5, 0.5);

    expect(xyz.x).toEqual(0.5);
    expect(xyz.y).toEqual(0.5);
    expect(xyz.z).toEqual(0.5);
  });

  it("check min values", () => {
    const xyz = new CieXyz(0, 0, 0);

    xyz.x = -10;
    xyz.y = -10;
    xyz.z = -10;

    expect(xyz.x).toEqual(0);
    expect(xyz.y).toEqual(0);
    expect(xyz.z).toEqual(0);
  });

  it("check max values", () => {
    const xyz = new CieXyz(0, 0, 0);

    xyz.x = 10;
    xyz.y = 10;
    xyz.z = 10;

    expect(xyz.x).toEqual(CieXyz.D65[0]);
    expect(xyz.y).toEqual(CieXyz.D65[1]);
    expect(xyz.z).toEqual(CieXyz.D65[2]);
  });

  it("check equality", () => {
    const xyz1 = new CieXyz(0.5, 0.5, 0.5);
    const xyz2 = new CieXyz(0.5, 0.5, 0.5);
    const xyz3 = new CieXyz(0, 0.5, 1);

    expect(xyz1.equals(xyz2)).toEqual(true);
    expect(xyz1.equals(xyz3)).toEqual(false);
    expect(xyz2.equals(xyz3)).toEqual(false);
  });

  it("converts to hex", () => {
    const xyz = new CieXyz(0.577202, 0.558198, 0.078182);
    const v = CieXyzConverter.CieXyzToHex(xyz);

    expect(v).toEqual("#fcb903");
  });

  it("converts to rgb", () => {
    const xyz = new CieXyz(0.577202, 0.558198, 0.078182);
    const v = CieXyzConverter.CieXyzToRgb(xyz);

    expect(v.r).toEqual(252);
    expect(v.g).toEqual(185);
    expect(v.b).toEqual(3);
  });

  it("converts to hsl", () => {
    const xyz = new CieXyz(0.577202, 0.558198, 0.078182);
    const v = CieXyzConverter.CieXyzToHsl(xyz);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(43.86);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.98);
    expect(Number.parseFloat(v.l.toFixed(2))).toEqual(0.5);
  });

  it("converts to hsb", () => {
    const xyz = new CieXyz(0.577202, 0.558198, 0.078182);
    const v = CieXyzConverter.CieXyzToHsb(xyz);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(43.86);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.b.toFixed(2))).toEqual(0.99);
  });

  it("converts to cmyk", () => {
    const xyz = new CieXyz(0.577202, 0.558198, 0.078182);
    const v = CieXyzConverter.CieXyzToCmyk(xyz);

    expect(Number.parseFloat(v.c.toFixed(2))).toEqual(0);
    expect(Number.parseFloat(v.m.toFixed(2))).toEqual(0.27);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.k.toFixed(2))).toEqual(0.01);
  });

  it("converts to yuv (default is BT.470)", () => {
    const xyz = new CieXyz(0.577202, 0.558198, 0.078182);
    const v = CieXyzConverter.CieXyzToYuv(xyz);

    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.72);
    expect(Number.parseFloat(v.u.toFixed(2))).toEqual(-0.35);
    expect(Number.parseFloat(v.v.toFixed(2))).toEqual(0.23);
  });
});
