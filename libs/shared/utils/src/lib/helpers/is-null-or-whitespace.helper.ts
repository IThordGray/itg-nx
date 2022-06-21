import { isNullOrUndefined } from './is-null-or-undefined.helper';
import { isWhiteSpace } from './is-white-space.helper';

export function isNullOrWhiteSpace(value: string): boolean {
  return isNullOrUndefined(value) || isWhiteSpace(value);
}
