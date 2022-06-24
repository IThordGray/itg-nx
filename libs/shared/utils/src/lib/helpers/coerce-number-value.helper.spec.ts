import { coerceNumberValue } from './coerce-number-value.helper';

describe('coerceNumberProperty', () => {
  it('should coerce undefined to 0 or default', () => {
    expect(coerceNumberValue(undefined)).toBe(0);
    expect(coerceNumberValue(undefined, 111)).toBe(111);
  });

  it('should coerce null to 0 or default', () => {
    expect(coerceNumberValue(null)).toBe(0);
    expect(coerceNumberValue(null, 111)).toBe(111);
  });

  it('should coerce true to 0 or default', () => {
    expect(coerceNumberValue(true)).toBe(0);
    expect(coerceNumberValue(true, 111)).toBe(111);
  });

  it('should coerce false to 0 or default', () => {
    expect(coerceNumberValue(false)).toBe(0);
    expect(coerceNumberValue(false, 111)).toBe(111);
  });

  it('should coerce the empty string to 0 or default', () => {
    expect(coerceNumberValue('')).toBe(0);
    expect(coerceNumberValue('', 111)).toBe(111);
  });

  it('should coerce the string "1" to 1', () => {
    expect(coerceNumberValue('1')).toBe(1);
    expect(coerceNumberValue('1', 111)).toBe(1);
  });

  it('should coerce the string "123.456" to 123.456', () => {
    expect(coerceNumberValue('123.456')).toBe(123.456);
    expect(coerceNumberValue('123.456', 111)).toBe(123.456);
  });

  it('should coerce the string "-123.456" to -123.456', () => {
    expect(coerceNumberValue('-123.456')).toBe(-123.456);
    expect(coerceNumberValue('-123.456', 111)).toBe(-123.456);
  });

  it('should coerce an arbitrary string to 0 or default', () => {
    expect(coerceNumberValue('pink')).toBe(0);
    expect(coerceNumberValue('pink', 111)).toBe(111);
  });

  it('should coerce an arbitrary string prefixed with a number to 0 or default', () => {
    expect(coerceNumberValue('123pink')).toBe(0);
    expect(coerceNumberValue('123pink', 111)).toBe(111);
  });

  it('should coerce the number 1 to 1', () => {
    expect(coerceNumberValue(1)).toBe(1);
    expect(coerceNumberValue(1, 111)).toBe(1);
  });

  it('should coerce the number 123.456 to 123.456', () => {
    expect(coerceNumberValue(123.456)).toBe(123.456);
    expect(coerceNumberValue(123.456, 111)).toBe(123.456);
  });

  it('should coerce the number -123.456 to -123.456', () => {
    expect(coerceNumberValue(-123.456)).toBe(-123.456);
    expect(coerceNumberValue(-123.456, 111)).toBe(-123.456);
  });

  it('should coerce an object to 0 or default', () => {
    expect(coerceNumberValue({})).toBe(0);
    expect(coerceNumberValue({}, 111)).toBe(111);
  });

  it('should coerce an array to 0 or default', () => {
    expect(coerceNumberValue([])).toBe(0);
    expect(coerceNumberValue([], 111)).toBe(111);
  });
});
