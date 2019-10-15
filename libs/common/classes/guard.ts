import { ArgumentNullError } from '../errors/argument-null.error';
import { InvalidOperationError } from '../errors/invalid-operation.error';
import { isNullOrUndefined } from '../helpers/is-null-or-undefined.helper';
import { isWhiteSpace } from '../helpers/is-whitespace.helper';
import { isEmptyArray } from '../helpers/is-empty-array.helper';
import { isEmptyObject } from '../helpers/is-empty-object.helper';

export class Guard {
  public static againstNullArgument(value: any, name: string): void {
    if (isNullOrUndefined(value)) {
      throw new ArgumentNullError(name);
    }
  }

  public static againstNullOrEmpty(value: any, name: string): void {
    if (
      isNullOrUndefined(value) ||
      (typeof value === 'string' && isWhiteSpace(value)) ||
      (Array.isArray(value) && isEmptyArray(value)) ||
      (typeof value === 'object' && isEmptyObject(value))
    ) {
      throw new InvalidOperationError(`${name} cannot be null or empty.`);
    }
  }
}
