import { log } from "console";
import { Yuv, YuvProfile, YuvConverter } from "../build/index";

describe("Yuv", () => {
  it("creates a new instance", () => {
    const yuv = new Yuv(0, 0, 0);

    expect(yuv.y).toEqual(0);
    expect(yuv.u).toEqual(0);
    expect(yuv.v).toEqual(0);
  });

  it("check min values (default is BT.470)", () => {
    const yuv = new Yuv(0, 0, 0);

    yuv.y = -10;
    yuv.u = YuvProfile.BT_470.uMin - 5;
    yuv.v = YuvProfile.BT_470.vMin - 5;

    expect(yuv.y).toEqual(0);
    expect(yuv.u).toEqual(YuvProfile.BT_470.uMin);
    expect(yuv.v).toEqual(YuvProfile.BT_470.vMin);
  });

  it("check max values (default is BT.470)", () => {
    const yuv = new Yuv(0, 0, 0);

    yuv.y = 2;
    yuv.u = YuvProfile.BT_470.uMax + 5;
    yuv.v = YuvProfile.BT_470.vMax + 5;

    expect(yuv.y).toEqual(1);
    expect(yuv.u).toEqual(YuvProfile.BT_470.uMax);
    expect(yuv.v).toEqual(YuvProfile.BT_470.vMax);
  });

  it("check equality", () => {
    const yuv1 = new Yuv(1, 0.2, 0.2);
    const yuv2 = new Yuv(1, 0.2, 0.2);
    const yuv3 = new Yuv(0, -0.3, -0.3);

    expect(yuv1.equals(yuv2)).toEqual(true);
    expect(yuv1.equals(yuv3)).toEqual(false);
    expect(yuv2.equals(yuv3)).toEqual(false);
  });

  it("converts to hex", () => {
    const yuv = new Yuv(0.724988, -0.350967, 0.230948);
    const v = YuvConverter.YuvToHex(yuv);

    expect(v).toEqual("#fcba03");
  });

  it("converts to rgb", () => {
    const yuv = new Yuv(0.724988, -0.350967, 0.230948);
    const v = YuvConverter.YuvToRgb(yuv);

    expect(v.r).toEqual(252);
    expect(v.g).toEqual(186);
    expect(v.b).toEqual(3);
  });

  it("converts to hsl", () => {
    const yuv = new Yuv(0.724988, -0.350967, 0.230948);
    const v = YuvConverter.YuvToHsl(yuv);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.98);
    expect(Number.parseFloat(v.l.toFixed(2))).toEqual(0.5);
  });

  it("converts to hsb", () => {
    const yuv = new Yuv(0.724988, -0.350967, 0.230948);
    const v = YuvConverter.YuvToHsb(yuv);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.b.toFixed(2))).toEqual(0.99);
  });

  it("converts to cmyk", () => {
    const yuv = new Yuv(0.724988, -0.350967, 0.230948);
    const v = YuvConverter.YuvToCmyk(yuv);

    expect(Number.parseFloat(v.c.toFixed(2))).toEqual(0);
    expect(Number.parseFloat(v.m.toFixed(2))).toEqual(0.26);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.k.toFixed(2))).toEqual(0.01);
  });

  it("converts to CIE Xyz", () => {
    const yuv = new Yuv(0.724988, -0.350967, 0.230948);
    const v = YuvConverter.YuvToCieXyz(yuv);

    expect(Number.parseFloat(v.x.toFixed(2))).toEqual(0.58);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.56);
    expect(Number.parseFloat(v.z.toFixed(2))).toEqual(0.08);
  });
});
