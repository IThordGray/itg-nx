import { FormatError } from '../../errors/format.error';
import { TimeOnly } from './time-only';

describe('TimeOnly.parse', () => {
  test('Correctly parse a valid time string without seconds', () => {
    const timeString = '14:45';
    const expected = new TimeOnly({ hour: 14, minute: 45 });
    const result = TimeOnly.parse(timeString);
    expect(result).toEqual(expected);
  });

  test('Correctly parse a valid time string with seconds', () => {
    const timeString = '23:59:59';
    const expected = new TimeOnly({ hour: 23, minute: 59, second: 59 });
    const result = TimeOnly.parse(timeString);
    expect(result).toEqual(expected);
  });

  test('Correctly parse a valid time string with milliseconds', () => {
    const timeString = '09:30:00.999';
    const expected = new TimeOnly({ hour: 9, minute: 30, second: 0, millisecond: 999 });
    const result = TimeOnly.parse(timeString);
    expect(result).toEqual(expected);
  });

  test('Throw error on invalid time string format', () => {
    const timeString = '25:61'; // Invalid hour and minute
    expect(() => {
      TimeOnly.parse(timeString);
    }).toThrow(FormatError);
  });

  test('Throw error on incomplete time string', () => {
    const timeString = '15'; // Missing minutes
    expect(() => {
      TimeOnly.parse(timeString);
    }).toThrow(FormatError);
  });

  test('Throw error on non-numeric time string', () => {
    const timeString = 'abc:def';
    expect(() => {
      TimeOnly.parse(timeString);
    }).toThrow(FormatError);
  });
});
