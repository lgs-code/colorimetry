import { log } from "console";
import { Hsb, HsbConverter } from "../build/index";

describe("Hsb", () => {
  it("creates a new instance", () => {
    const hsb = new Hsb(360, 1, 1);

    expect(hsb.h).toEqual(360);
    expect(hsb.s).toEqual(1);
    expect(hsb.b).toEqual(1);
  });

  it("check min values", () => {
    const hsb = new Hsb(0, 0, 0);

    hsb.h = -10;
    hsb.s = -10;
    hsb.b = -10;

    expect(hsb.h).toEqual(0);
    expect(hsb.s).toEqual(0);
    expect(hsb.b).toEqual(0);
  });

  it("check max values", () => {
    const hsb = new Hsb(0, 0, 0);

    hsb.h = 500;
    hsb.s = 2;
    hsb.b = 2;

    expect(hsb.h).toEqual(360);
    expect(hsb.s).toEqual(1);
    expect(hsb.b).toEqual(1);
  });

  it("check equality", () => {
    const hsb1 = new Hsb(360, 1, 1);
    const hsb2 = new Hsb(360, 1, 1);
    const hsb3 = new Hsb(180, 0, 0);

    expect(hsb1.equals(hsb2)).toEqual(true);
    expect(hsb1.equals(hsb3)).toEqual(false);
    expect(hsb2.equals(hsb3)).toEqual(false);
  });

  it("converts to hex", () => {
    const hsb = new Hsb(44.1, 0.99, 0.99);
    const v = HsbConverter.HsbToHex(hsb);
    expect(v).toEqual("#fcba03");
  });

  const hsbToRgbValues = [
    { hsb: [44.1, 0.99, 0.99], rgb: [252, 186, 3] },
    { hsb: [61, 0.77, 0.57], rgb: [143, 145, 33] },
    { hsb: [121, 0.77, 0.57], rgb: [33, 145, 35] },
    { hsb: [181, 0.77, 0.57], rgb: [33, 143, 145] },
    { hsb: [241, 0.77, 0.57], rgb: [35, 33, 145] },
    { hsb: [301, 0.77, 0.57], rgb: [145, 33, 143] },
  ];

  it.each(hsbToRgbValues)("converts to rgb", ({ hsb, rgb }) => {
    const h = new Hsb(hsb[0], hsb[1], hsb[2]);
    const v = HsbConverter.HsbToRgb(h);

    expect(v.r).toEqual(rgb[0]);
    expect(v.g).toEqual(rgb[1]);
    expect(v.b).toEqual(rgb[2]);
  });

  it("converts to hsb", () => {
    const hsb = new Hsb(44.1, 0.99, 0.99);
    const v = HsbConverter.HsbToHsl(hsb);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(44.1);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(0.98);
    expect(Number.parseFloat(v.l.toFixed(2))).toEqual(0.5);
  });

  it("converts to cmyk", () => {
    const hsb = new Hsb(44.1, 0.99, 0.99);
    const v = HsbConverter.HsbToCmyk(hsb);

    expect(Number.parseFloat(v.c.toFixed(2))).toEqual(0);
    expect(Number.parseFloat(v.m.toFixed(2))).toEqual(0.26);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.99);
    expect(Number.parseFloat(v.k.toFixed(2))).toEqual(0.01);
  });

  it("converts to yuv (default is BT.470)", () => {
    const hsb = new Hsb(44.1, 0.99, 0.99);
    const v = HsbConverter.HsbToYuv(hsb);

    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.72);
    expect(Number.parseFloat(v.u.toFixed(2))).toEqual(-0.35);
    expect(Number.parseFloat(v.v.toFixed(2))).toEqual(0.23);
  });

  it("converts to CIE Xyz", () => {
    const hsb = new Hsb(44.1, 0.99, 0.99);
    const v = HsbConverter.HsbToCieXyz(hsb);

    expect(Number.parseFloat(v.x.toFixed(2))).toEqual(0.58);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.56);
    expect(Number.parseFloat(v.z.toFixed(2))).toEqual(0.08);
  });
});
