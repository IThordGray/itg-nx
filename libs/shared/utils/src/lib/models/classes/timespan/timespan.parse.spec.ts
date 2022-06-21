import { FormatError } from '../../errors/format.error';
import { Timespan } from './timespan';

describe('Timespan.parse', () => {
  test('6 => 6.00:00:00', () => {
    const result = new Timespan({ days: 6, hours: 0, minutes: 0, seconds: 0 });
    const ts = '6';
    expect(Timespan.parse(ts)).toEqual(result);
  });

  test('6:12 => 06:12:00', () => {
    const result = new Timespan({ days: 0, hours: 6, minutes: 12, seconds: 0 });
    const ts = '6:12';
    expect(Timespan.parse(ts)).toEqual(result);
  });

  test('6:12:14 => 06:12:14', () => {
    const result = new Timespan({ days: 0, hours: 6, minutes: 12, seconds: 14 });
    const ts = '6:12:14';
    expect(Timespan.parse(ts)).toEqual(result);
  });

  test('6:12:14:45 => 6.12:14:45', () => {
    const result = new Timespan({ days: 6, hours: 12, minutes: 14, seconds: 45, milliseconds: 0 });
    const ts = '6:12:14:45';
    expect(Timespan.parse(ts)).toEqual(result);
  });

  test('6.12:14:45 => 6.12:14:45', () => {
    const result = new Timespan({ days: 6, hours: 12, minutes: 14, seconds: 45 });
    const ts = '6.12:14:45';
    expect(Timespan.parse(ts)).toEqual(result);
  });

  test('6:12:14:45.345 => 6.12:14:45.345', () => {
    const result = new Timespan({ days: 6, hours: 12, minutes: 14, seconds: 45, milliseconds: 345 });
    const ts = '6:12:14:45.345';
    expect(Timespan.parse(ts)).toEqual(result);
  });

  test('6:12:14:45,3448 => Bad Format', () => {
    const ts = '6:12:14:45,3448';
    expect(() => Timespan.parse(ts)).toThrow(FormatError);
  });
});
