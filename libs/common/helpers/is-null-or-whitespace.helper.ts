import { isNullOrUndefined } from './is-null-or-undefined.helper';
import { isWhiteSpace } from './is-whitespace.helper';

export function isNullOrWhiteSpace(value: any): boolean {
  return isNullOrUndefined(value) || isWhiteSpace(value);
}
