/**
 * Provides a common location for color conversion.
 */
export namespace ConverterUtils {
  export function roundInt(value: number, fractionDigits: number = 2): number {
    return Math.round(Number.parseFloat(value.toFixed(fractionDigits)));
  }
}
