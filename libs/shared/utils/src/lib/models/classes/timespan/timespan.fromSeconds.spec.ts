import { Timespan } from './timespan';

describe('Timespan.fromSeconds => Timespan.totalSeconds', () => {
  test('0.001 => 00:00:00.001 => 0.001', () => {
    const ts = Timespan.fromSeconds(0.001);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 1 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(0.001);
  });

  test('0.0015 => 00:00:00.002 => 0.002', () => {
    const ts = Timespan.fromSeconds(0.0015);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 2 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(0.002);
  });

  test('12.3456 => 00:00:12.346 => 12.346', () => {
    const ts = Timespan.fromSeconds(12.3456);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 12, milliseconds: 346 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(12.346);
  });

  test('123456.7898 => 1.10:17:36.790 => 123456.79', () => {
    const ts = Timespan.fromSeconds(123456.7898);
    const result = new Timespan({ days: 1, hours: 10, minutes: 17, seconds: 36, milliseconds: 790 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(123456.79);
  });

  test('1234567898.765 => 14288.23:31:38.765 => 1234567898.765', () => {
    const ts = Timespan.fromSeconds(1234567898.765);
    const result = new Timespan({ days: 14288, hours: 23, minutes: 31, seconds: 38, milliseconds: 765 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(1234567898.765);
  });

  test('1 => 00:00:01 => 1', () => {
    const ts = Timespan.fromSeconds(1);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 1, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(1);
  });

  test('60 => 00:01:00 => 60', () => {
    const ts = Timespan.fromSeconds(60);
    const result = new Timespan({ days: 0, hours: 0, minutes: 1, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(60);
  });

  test('3600 => 01:00:00 => 3600', () => {
    const ts = Timespan.fromSeconds(3600);
    const result = new Timespan({ days: 0, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(3600);
  });

  test('86400 => 1.00:00:00 => 86400', () => {
    const ts = Timespan.fromSeconds(86400);
    const result = new Timespan({ days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(86400);
  });

  test('1801220.2 => 20.20:20:20.200 => 1801220.2', () => {
    const ts = Timespan.fromSeconds(1801220.2);
    const result = new Timespan({ days: 20, hours: 20, minutes: 20, seconds: 20, milliseconds: 200 });

    expect(ts).toEqual(result);
    expect(result.totalSeconds).toEqual(1801220.2);
  });
});
