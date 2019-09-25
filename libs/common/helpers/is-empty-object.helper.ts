import { InvalidOperationError } from '../errors/invalid-operation.error';

export function isEmptyObject(value: any): boolean {

  if (typeof value !== 'object') {
    throw new InvalidOperationError(`Cannot check value for empty object. Value is not of type 'object'.`);
  }

  return Object.keys(value).length === 0 && value.constructor === Object;
}
