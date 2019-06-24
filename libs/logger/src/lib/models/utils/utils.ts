export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function isWhiteSpace(value: string): boolean {

  if (typeof value !== 'string') {
    throw new TypeError('Cannot check value that is not of type string.');
  }

  return value.replace(/\s/g, '').length < 1;
}

export function isNullOrWhitespace(value: string): boolean {
  return isNullOrUndefined(value) || isWhiteSpace(value);
}

