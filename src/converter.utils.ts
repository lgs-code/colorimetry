/**
 * Provides a common location for color conversion.
 */
export namespace ConverterUtils {
  export function roundInt(value: number, fractionDigits: number = 2): number {
    return parseInt((value * 255.0).toFixed(fractionDigits));
  }
}
