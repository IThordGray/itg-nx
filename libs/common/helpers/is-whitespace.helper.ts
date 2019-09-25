import { InvalidOperationError } from '../errors/invalid-operation.error';

export function isWhiteSpace(value: any): boolean {
  if (typeof value !== 'string') {
    throw new InvalidOperationError(`Cannot check value for whitespace. Value is not of type 'string'.`);
  }

  return value.replace(/\s/g, '').length < 1;
}
