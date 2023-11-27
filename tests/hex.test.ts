import { log } from "console";
import { HexConverter } from "../build/index";

describe("Hex", () => {
  it("converts to rgb using 3 notation", () => {
    const hex = "#fff";
    const v = HexConverter.HexToRgb(hex);

    expect(v.r).toEqual(255);
    expect(v.g).toEqual(255);
    expect(v.b).toEqual(255);
  });

  it("converts to rgb", () => {
    const hex = "#fcba03";
    const v = HexConverter.HexToRgb(hex);

    expect(v.r).toEqual(252);
    expect(v.g).toEqual(186);
    expect(v.b).toEqual(3);
  });

  it("converts to hsl", () => {
    const hex = "#fcba03";
    const v = HexConverter.HexToHsl(hex);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.98);
    expect(Number.parseFloat(v.l.toFixed(2))).toEqual(0.5);
  });

  it("converts to hsb", () => {
    const hex = "#fcba03";
    const v = HexConverter.HexToHsb(hex);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.b.toFixed(2))).toEqual(0.99);
  });

  it("converts to cmyk", () => {
    const hex = "#fcba03";
    const v = HexConverter.HexToCmyk(hex);

    expect(Number.parseFloat(v.c.toFixed(2))).toEqual(0);
    expect(Number.parseFloat(v.m.toFixed(2))).toEqual(0.26);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.k.toFixed(2))).toEqual(0.01);
  });

  it("converts to yuv (default is BT.470)", () => {
    const hex = "#fcba03";
    const v = HexConverter.HexToYuv(hex);

    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.72);
    expect(Number.parseFloat(v.u.toFixed(2))).toEqual(-0.35);
    expect(Number.parseFloat(v.v.toFixed(2))).toEqual(0.23);
  });

  it("converts to CIE Xyz", () => {
    const hex = "#fcba03";
    const v = HexConverter.HexToCieXyz(hex);

    expect(Number.parseFloat(v.x.toFixed(2))).toEqual(0.58);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.56);
    expect(Number.parseFloat(v.z.toFixed(2))).toEqual(0.08);
  });
});
