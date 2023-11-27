import { log } from "console";
import { Hsl, HslConverter } from "../build/index";

describe("Hsl", () => {
  it("creates a new instance", () => {
    const hsl = new Hsl(360, 1, 1);

    expect(hsl.h).toEqual(360);
    expect(hsl.s).toEqual(1);
    expect(hsl.l).toEqual(1);
  });

  it("check min values", () => {
    const hsl = new Hsl(0, 0, 0);

    hsl.h = -10;
    hsl.s = -10;
    hsl.l = -10;

    expect(hsl.h).toEqual(0);
    expect(hsl.s).toEqual(0);
    expect(hsl.l).toEqual(0);
  });

  it("check max values", () => {
    const hsl = new Hsl(0, 0, 0);

    hsl.h = 500;
    hsl.s = 2;
    hsl.l = 2;

    expect(hsl.h).toEqual(360);
    expect(hsl.s).toEqual(1);
    expect(hsl.l).toEqual(1);
  });

  it("check equality", () => {
    const hsl1 = new Hsl(360, 1, 1);
    const hsl2 = new Hsl(360, 1, 1);
    const hsl3 = new Hsl(180, 0, 0);

    expect(hsl1.equals(hsl2)).toEqual(true);
    expect(hsl1.equals(hsl3)).toEqual(false);
    expect(hsl2.equals(hsl3)).toEqual(false);
  });

  it("converts to hex", () => {
    const hsl = new Hsl(44.1, 0.98, 0.5);
    const v = HslConverter.HslToHex(hsl);

    expect(v).toEqual("#fcba03");
  });

  it("converts to rgb", () => {
    const hsl = new Hsl(44.1, 0.98, 0.5);
    const v = HslConverter.HslToRgb(hsl);

    expect(v.r).toEqual(252);
    expect(v.g).toEqual(186);
    expect(v.b).toEqual(3);
  });

  it("converts to hsb", () => {
    const hsl = new Hsl(44.1, 0.98, 0.5);
    const v = HslConverter.HslToHsb(hsl);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.b.toFixed(2))).toEqual(0.99);
  });

  it("converts to cmyk", () => {
    const hsl = new Hsl(44.1, 0.98, 0.5);
    const v = HslConverter.HslToCmyk(hsl);

    expect(Number.parseFloat(v.c.toFixed(2))).toEqual(0);
    expect(Number.parseFloat(v.m.toFixed(2))).toEqual(0.26);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.k.toFixed(2))).toEqual(0.01);
  });

  it("converts to yuv (default is BT.470)", () => {
    const hsl = new Hsl(44.1, 0.98, 0.5);
    const v = HslConverter.HslToYuv(hsl);

    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.72);
    expect(Number.parseFloat(v.u.toFixed(2))).toEqual(-0.35);
    expect(Number.parseFloat(v.v.toFixed(2))).toEqual(0.23);
  });

  it("converts to CIE Xyz", () => {
    const hsl = new Hsl(44.1, 0.98, 0.5);
    const v = HslConverter.HslToCieXyz(hsl);

    expect(Number.parseFloat(v.x.toFixed(2))).toEqual(0.58);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.56);
    expect(Number.parseFloat(v.z.toFixed(2))).toEqual(0.08);
  });
});
