import { log } from "console";
import { Cmyk, CmykConverter } from "../build/index";

describe("Cmyk", () => {
  it("creates a new instance", () => {
    const cmyk = new Cmyk(0, 0, 0, 0);

    expect(cmyk.c).toEqual(0);
    expect(cmyk.m).toEqual(0);
    expect(cmyk.y).toEqual(0);
    expect(cmyk.k).toEqual(0);
  });

  it("check min values", () => {
    const cmyk = new Cmyk(0, 0, 0, 0);

    cmyk.c = -10;
    cmyk.m = -10;
    cmyk.y = -10;
    cmyk.k = -10;

    expect(cmyk.c).toEqual(0);
    expect(cmyk.m).toEqual(0);
    expect(cmyk.y).toEqual(0);
    expect(cmyk.k).toEqual(0);
  });

  it("check max values", () => {
    const cmyk = new Cmyk(0, 0, 0, 0);

    cmyk.c = 2;
    cmyk.m = 2;
    cmyk.y = 2;
    cmyk.k = 2;

    expect(cmyk.c).toEqual(1);
    expect(cmyk.m).toEqual(1);
    expect(cmyk.y).toEqual(1);
    expect(cmyk.k).toEqual(1);
  });

  it("check equality", () => {
    const cmyk1 = new Cmyk(0.1, 0.2, 0.3, 0.4);
    const cmyk2 = new Cmyk(0.1, 0.2, 0.3, 0.4);
    const cmyk3 = new Cmyk(0.4, 0.3, 0.2, 0.1);

    expect(cmyk1.equals(cmyk2)).toEqual(true);
    expect(cmyk1.equals(cmyk3)).toEqual(false);
    expect(cmyk2.equals(cmyk3)).toEqual(false);
  });

  it("converts to hex", () => {
    const cmyk = new Cmyk(0, 0.261904, 0.988095, 0.011764);
    const v = CmykConverter.CmykToHex(cmyk);

    expect(v).toEqual("#fcba03");
  });

  it("converts to rgb", () => {
    const cmyk = new Cmyk(0, 0.261904, 0.988095, 0.011764);
    const v = CmykConverter.CmykToRgb(cmyk);

    expect(v.r).toEqual(252);
    expect(v.g).toEqual(186);
    expect(v.b).toEqual(3);
  });

  it("converts to hsl", () => {
    const cmyk = new Cmyk(0, 0.261904, 0.988095, 0.011764);
    const v = CmykConverter.CmykToHsl(cmyk);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.98);
    expect(Number.parseFloat(v.l.toFixed(2))).toEqual(0.5);
  });

  it("converts to hsb", () => {
    const cmyk = new Cmyk(0, 0.261904, 0.988095, 0.011764);
    const v = CmykConverter.CmykToHsb(cmyk);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.b.toFixed(2))).toEqual(0.99);
  });

  it("converts to yuv (default is BT.470)", () => {
    const cmyk = new Cmyk(0, 0.261904, 0.988095, 0.011764);
    const v = CmykConverter.CmykToYuv(cmyk);

    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.72);
    expect(Number.parseFloat(v.u.toFixed(2))).toEqual(-0.35);
    expect(Number.parseFloat(v.v.toFixed(2))).toEqual(0.23);
  });

  it("converts to CIE Xyz", () => {
    const cmyk = new Cmyk(0, 0.261904, 0.988095, 0.011764);
    const v = CmykConverter.CmykToCieXyz(cmyk);

    expect(Number.parseFloat(v.x.toFixed(2))).toEqual(0.58);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.56);
    expect(Number.parseFloat(v.z.toFixed(2))).toEqual(0.08);
  });
});
