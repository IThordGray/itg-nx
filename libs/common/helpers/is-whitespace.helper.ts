export function isWhiteSpace(value: any): boolean {
  return typeof value === 'string' && value.replace(/\s/g, '').length < 1;
}
