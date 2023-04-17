import { isNullOrUndefined } from './is-null-or-undefined.helper';

describe('isNullOrUndefined', () => {
  it('should return true when called with null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });

  it('should return true when called with undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });

  it('should return false when called with a non-null, non-undefined value', () => {
    expect(isNullOrUndefined('hello')).toBe(false);
    expect(isNullOrUndefined(123)).toBe(false);
    expect(isNullOrUndefined({ a: 1 })).toBe(false);
  });
});
