export function isEmptyArray(value: any[]): boolean {
  return Array.isArray(value) && !value.length;
}
