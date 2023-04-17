import { isString } from './is-string.helper';

describe('isString function', () => {
  test('should return true for strings', () => {
    expect(isString('hello')).toBe(true);
    expect(isString('')).toBe(true);
  });

  test('should return false for non-strings', () => {
    expect(isString(42)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({ foo: 'bar' })).toBe(false);
  });
});
