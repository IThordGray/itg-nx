/** Coerces a data-bound value (typically a string) to a boolean. */
import { isNullOrUndefined } from './is-null-or-undefined.helper';

export function coerceBooleanValue(value: any): boolean {
  if (isNullOrUndefined(value)) return false;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'object') return true;
  if (Number.isNaN(value)) return false;
  if (typeof value === 'number') return !(value === -0 || value === 0);
  if (typeof value === 'string') return value !== '' && value.toLowerCase() !== 'false';
  return false;
}

