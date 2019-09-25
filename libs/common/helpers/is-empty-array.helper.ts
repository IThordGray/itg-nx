import { InvalidOperationError } from '../errors/invalid-operation.error';

export function isEmptyArray(value: any[]): boolean {
  if (!Array.isArray(value)) {
    throw new InvalidOperationError(`Cannot check value for empty items. Value is not of type 'Array'.`);
  }

  return !value.length;
}
