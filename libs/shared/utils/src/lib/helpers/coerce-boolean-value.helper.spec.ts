import { coerceBooleanValue } from './coerce-boolean-value.helper';

describe('coerceBooleanProperty', () => {
  it('should coerce undefined to false', () => {
    expect(coerceBooleanValue(undefined)).toBe(false);
  });

  it('should coerce null to false', () => {
    expect(coerceBooleanValue(null)).toBe(false);
  });

  it('should coerce the empty string to false', () => {
    expect(coerceBooleanValue('')).toBe(false);
  });

  it('should coerce zero to false', () => {
    expect(coerceBooleanValue(0)).toBe(false);
  });

  it('should coerce the string "false" to false', () => {
    expect(coerceBooleanValue('false')).toBe(false);
  });

  it('should coerce the boolean false to false', () => {
    expect(coerceBooleanValue(false)).toBe(false);
  });

  it('should coerce the boolean true to true', () => {
    expect(coerceBooleanValue(true)).toBe(true);
  });

  it('should coerce the string "true" to true', () => {
    expect(coerceBooleanValue('true')).toBe(true);
  });

  it('should coerce an arbitrary string to true', () => {
    expect(coerceBooleanValue('pink')).toBe(true);
  });

  it('should coerce an object to true', () => {
    expect(coerceBooleanValue({})).toBe(true);
  });

  it('should coerce an array to true', () => {
    expect(coerceBooleanValue([])).toBe(true);
  });
});
