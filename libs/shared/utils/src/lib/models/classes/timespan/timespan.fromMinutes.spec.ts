import { Timespan } from './timespan';

describe('Timespan.fromMinutes => Timespan.totalMinutes', () => {
  test('0.12345 => 00:00:07.407 => 0.12345', () => {
    const ts = Timespan.fromMinutes(0.12345);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 7, milliseconds: 407 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(0.12345);
  });

  test('1234.56789 => 20:34:34.073 => 1234.56789', () => {
    const ts = Timespan.fromMinutes(1234.56789);
    const result = new Timespan({ days: 0, hours: 20, minutes: 34, seconds: 34, milliseconds: 73 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(1234.56788);
  });

  test('12345678.98765 => 8573.09:18:59.259 => 12345678.98765', () => {
    const ts = Timespan.fromMinutes(12345678.98765);
    const result = new Timespan({ days: 8573, hours: 9, minutes: 18, seconds: 59, milliseconds: 259 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(12345678.98765);
  });

  test('0.01666 => 00:00:01 => 0.01666', () => {
    const ts = Timespan.fromMinutes(0.01666);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 1, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(0.01667);
  });

  test('1 => 00:01:00 => 1', () => {
    const ts = Timespan.fromMinutes(1);
    const result = new Timespan({ days: 0, hours: 0, minutes: 1, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(1);
  });

  test('60 => 01:00:00 => 60', () => {
    const ts = Timespan.fromMinutes(60);
    const result = new Timespan({ days: 0, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(60);
  });

  test('1440 => 1.00:00:00 = 1440', () => {
    const ts = Timespan.fromMinutes(1440);
    const result = new Timespan({ days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(1440);
  });

  test('30020.33667 => 20.20:20:20.200 => 30020.33667', () => {
    const ts = Timespan.fromMinutes(30020.33667);
    const result = new Timespan({ days: 20, hours: 20, minutes: 20, seconds: 20, milliseconds: 200 });

    expect(ts).toEqual(result);
    expect(result.totalMinutes).toEqual(30020.33667);
  });
});
