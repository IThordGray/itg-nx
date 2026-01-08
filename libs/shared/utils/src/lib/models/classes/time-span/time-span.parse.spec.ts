import { FormatError } from '../../errors/format.error';
import { TimeSpan } from './time-span';

describe('TimeSpan.parse', () => {
  test('6 => 6.00:00:00', () => {
    const result = new TimeSpan({ days: 6, hours: 0, minutes: 0, seconds: 0 });
    const ts = '6';
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('6:12 => 06:12:00', () => {
    const result = new TimeSpan({ days: 0, hours: 6, minutes: 12, seconds: 0 });
    const ts = '6:12';
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('6:12:14 => 06:12:14', () => {
    const result = new TimeSpan({ days: 0, hours: 6, minutes: 12, seconds: 14 });
    const ts = '6:12:14';
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('6:12:14:45 => 6.12:14:45', () => {
    const result = new TimeSpan({ days: 6, hours: 12, minutes: 14, seconds: 45, milliseconds: 0 });
    const ts = '6:12:14:45';
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('6.12:14:45 => 6.12:14:45', () => {
    const result = new TimeSpan({ days: 6, hours: 12, minutes: 14, seconds: 45 });
    const ts = '6.12:14:45';
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('6:12:14:45.345 => 6.12:14:45.345', () => {
    const result = new TimeSpan({ days: 6, hours: 12, minutes: 14, seconds: 45, milliseconds: 345 });
    const ts = '6:12:14:45.345';
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('00:01:29.3643211 => converts fractional seconds to milliseconds (7 digits)', () => {
    const ts = '00:01:29.3643211';
    const result = TimeSpan.parse(ts);
    // 1 minute + 29 seconds + 0.3643211 seconds = 60000 + 29000 + 364 ms = 89364 ms
    // 0.3643211 seconds = 364.3211 ms (rounded to 364 ms)
    expect(result.totalMilliseconds).toBe(89364);
  });

  test('6:12:14:45.123456 => converts fractional seconds to milliseconds (6 digits)', () => {
    const ts = '6:12:14:45.123456';
    const result = TimeSpan.parse(ts);
    // 6 days + 12 hours + 14 minutes + 45 seconds + 0.123456 seconds
    // 0.123456 seconds = 123.456 ms (rounded to 123 ms)
    const expected = new TimeSpan({ days: 6, hours: 12, minutes: 14, seconds: 45, milliseconds: 123 });
    expect(result.totalMilliseconds).toBe(expected.totalMilliseconds);
  });

  test('6:12:14.5 => converts fractional seconds to milliseconds (single digit)', () => {
    const result = new TimeSpan({ days: 0, hours: 6, minutes: 12, seconds: 14, milliseconds: 500 });
    const ts = '6:12:14.5';
    // 0.5 seconds = 500 milliseconds
    expect(TimeSpan.parse(ts)).toEqual(result);
  });

  test('-00:01:29.3643211 => negative timespan with fractional seconds', () => {
    const ts = '-00:01:29.3643211';
    const result = TimeSpan.parse(ts);
    // Negative: 1 minute + 29 seconds + 0.3643211 seconds = -89364 ms
    expect(result.totalMilliseconds).toBe(-89364);
  });

  test('-6:12:14:45.345 => negative timespan with days', () => {
    const result = new TimeSpan({ days: 6, hours: 12, minutes: 14, seconds: 45, milliseconds: 345 });
    const negated = result.negate();
    const ts = '-6:12:14:45.345';
    expect(TimeSpan.parse(ts)).toEqual(negated);
  });

  test('-6:12 => negative short format', () => {
    const result = new TimeSpan({ days: 0, hours: 6, minutes: 12, seconds: 0 });
    const negated = result.negate();
    const ts = '-6:12';
    expect(TimeSpan.parse(ts)).toEqual(negated);
  });

  test('-6 => negative days only', () => {
    const result = new TimeSpan({ days: 6, hours: 0, minutes: 0, seconds: 0 });
    const negated = result.negate();
    const ts = '-6';
    expect(TimeSpan.parse(ts)).toEqual(negated);
  });

  test('6:12:14:45,3448 => Bad Format', () => {
    const ts = '6:12:14:45,3448';
    expect(() => TimeSpan.parse(ts)).toThrow(FormatError);
  });
});
