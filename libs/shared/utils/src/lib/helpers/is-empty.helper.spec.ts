import { isEmpty } from './is-empty.helper';

describe('isEmpty', () => {
  it('should return true for null and undefined values', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
  });

  it('should return true for empty arrays, strings, and array-like objects', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty({ length: 0 })).toBe(true);
  });

  it('should return false for non-empty arrays, strings, and array-like objects', () => {
    expect(isEmpty([ 1, 2, 3 ])).toBe(false);
    expect(isEmpty('hello')).toBe(false);
    expect(isEmpty({ length: 1, 0: 'a' })).toBe(false);
  });

  it('should return true for empty objects, maps, and sets', () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
  });

  it('should return false for non-empty objects, maps, and sets', () => {
    expect(isEmpty({ a: 1, b: 2 })).toBe(false);
    expect(isEmpty(new Map([ [ 'a', 1 ] ]))).toBe(false);
    expect(isEmpty(new Set([ 1 ]))).toBe(false);
  });

  it('should handle Buffer and typed arrays', () => {
    expect(isEmpty(Buffer.from([]))).toBe(true);
    expect(isEmpty(new Uint8Array())).toBe(true);
    expect(isEmpty(Buffer.from([ 1, 2, 3 ]))).toBe(false);
    expect(isEmpty(new Uint8Array([ 1, 2, 3 ]))).toBe(false);
  });
});
