export function isEmptyObject(value: any): boolean {
  return Object.keys(value).length === 0 && value.constructor === Object;
}
