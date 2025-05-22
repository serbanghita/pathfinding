/**
 * In fact this checks if we have a valid number (we're more interested in integers)
 * but we don't care about checking for BigInts.
 * @param n
 */
export function isNumber(n: unknown) {
  return typeof n === "number" && !isNaN(n);
}
