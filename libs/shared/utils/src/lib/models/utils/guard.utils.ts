import isEmpty from 'lodash-es/isEmpty';
import { isNullOrUndefined } from '../../helpers/is-null-or-undefined.helper';
import { isWhiteSpace } from '../../helpers/is-white-space.helper';
import { ArgumentNullError } from '../errors/argument-null.error';
import { InvalidOperationError } from '../errors/invalid-operation.error';

export class Guard {

  static againstNullArgument(value: any, name: string): void {
    if (isNullOrUndefined(value)) throw new ArgumentNullError(name);
  }

  static againstNullOrEmpty(value: any, name: string): void {
    if (
      isNullOrUndefined(value) ||
      (typeof value === 'string' && isWhiteSpace(value)) ||
      (Array.isArray(value) && isEmpty(value)) ||
      (typeof value === 'object' && isEmpty(value))
    ) throw new InvalidOperationError(`${ name } cannot be null or empty.`);
  }

}
