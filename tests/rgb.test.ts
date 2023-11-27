import { log } from "console";
import { Rgb, RgbConverter } from "../build/index";

describe("Rgb", () => {
  it("creates a new instance", () => {
    const rgb = new Rgb(10, 20, 30);

    expect(rgb.r).toEqual(10);
    expect(rgb.g).toEqual(20);
    expect(rgb.b).toEqual(30);
  });

  it("check min values", () => {
    const rgb = new Rgb(0, 0, 0);

    rgb.r = -10;
    rgb.g = -10;
    rgb.b = -10;

    expect(rgb.r).toEqual(0);
    expect(rgb.g).toEqual(0);
    expect(rgb.b).toEqual(0);
  });

  it("check max values", () => {
    const rgb = new Rgb(0, 0, 0);

    rgb.r = 300;
    rgb.g = 300;
    rgb.b = 300;

    expect(rgb.r).toEqual(255);
    expect(rgb.g).toEqual(255);
    expect(rgb.b).toEqual(255);
  });

  it("check equality", () => {
    const rgb1 = new Rgb(10, 20, 30);
    const rgb2 = new Rgb(10, 20, 30);
    const rgb3 = new Rgb(30, 20, 10);

    expect(rgb1.equals(rgb2)).toEqual(true);
    expect(rgb1.equals(rgb3)).toEqual(false);
    expect(rgb2.equals(rgb3)).toEqual(false);
  });

  it("converts to hex", () => {
    const rgb = new Rgb(10, 20, 30);
    const v = RgbConverter.RgbToHex(rgb);

    expect(v).toEqual("#0a141e");
  });

  const rgbToHslValues = [
    { rgb: [0, 0, 0], hsl: [0, 0, 0] },
    { rgb: [255, 255, 255], hsl: [0, 0, 1] },
    { rgb: [252, 186, 3], hsl: [44.1, 0.98, 0.5] },
    { rgb: [145, 33, 143], hsl: [301.07, 0.63, 0.35] },
    { rgb: [33, 145, 73], hsl: [141.43, 0.63, 0.35] },
    { rgb: [33, 143, 145], hsl: [181.07, 0.63, 0.35] },
  ];

  it.each(rgbToHslValues)("converts to hsl", ({ rgb, hsl }) => {
    const r = new Rgb(rgb[0], rgb[1], rgb[2]);
    const v = RgbConverter.RgbToHsl(r);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(hsl[0]);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(hsl[1]);
    expect(Number.parseFloat(v.l.toFixed(2))).toEqual(hsl[2]);
  });

  const rgbToHsbValues = [
    { rgb: [0, 0, 0], hsb: [0, 0, 0] },
    { rgb: [255, 255, 255], hsb: [0, 0, 1] },
    { rgb: [252, 186, 3], hsb: [44.1, 0.99, 0.99] },
    { rgb: [145, 33, 143], hsb: [301.07, 0.77, 0.57] },
    { rgb: [33, 145, 73], hsb: [141.43, 0.77, 0.57] },
    { rgb: [33, 143, 145], hsb: [181.07, 0.77, 0.57] },
  ];

  it.each(rgbToHsbValues)("converts to hsb", ({ rgb, hsb }) => {
    const r = new Rgb(rgb[0], rgb[1], rgb[2]);
    const v = RgbConverter.RgbToHsb(r);

    expect(Number.parseFloat(v.h.toFixed(2))).toEqual(hsb[0]);
    expect(Number.parseFloat(v.s.toFixed(2))).toEqual(hsb[1]);
    expect(Number.parseFloat(v.b.toFixed(2))).toEqual(hsb[2]);
  });

  const rgbToCmykValues = [
    { rgb: [0, 0, 0], cmyk: [0, 0, 0, 1] },
    { rgb: [255, 255, 255], cmyk: [0, 0, 0, 0] },
    { rgb: [252, 186, 3], cmyk: [0, 0.26, 0.99, 0.01] },
  ];

  it.each(rgbToCmykValues)("converts to cmyk", ({ rgb, cmyk }) => {
    const r = new Rgb(rgb[0], rgb[1], rgb[2]);
    const v = RgbConverter.RgbToCmyk(r);

    expect(Number.parseFloat(v.c.toFixed(2))).toEqual(cmyk[0]);
    expect(Number.parseFloat(v.m.toFixed(2))).toEqual(cmyk[1]);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(cmyk[2]);
    expect(Number.parseFloat(v.k.toFixed(2))).toEqual(cmyk[3]);
  });

  it("converts to yuv (default is BT.470)", () => {
    const rgb = new Rgb(252, 186, 3);
    const v = RgbConverter.RgbToYuv(rgb);

    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.72);
    expect(Number.parseFloat(v.u.toFixed(2))).toEqual(-0.35);
    expect(Number.parseFloat(v.v.toFixed(2))).toEqual(0.23);
  });

  it("converts to CIE Xyz", () => {
    const rgb = new Rgb(252, 186, 3);
    const v = RgbConverter.RgbToCieXyz(rgb);

    expect(Number.parseFloat(v.x.toFixed(2))).toEqual(0.58);
    expect(Number.parseFloat(v.y.toFixed(2))).toEqual(0.56);
    expect(Number.parseFloat(v.z.toFixed(2))).toEqual(0.08);
  });
});
