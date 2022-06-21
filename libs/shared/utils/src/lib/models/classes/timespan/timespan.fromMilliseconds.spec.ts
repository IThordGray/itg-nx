import { Timespan } from "./timespan";

describe('Timespan.fromMilliseconds => Timespan.totalMilliseconds', () => {
  test('1 => 00:00:00.001 => 1', () => {
    const ts = Timespan.fromMilliseconds(1);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 1 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(1);
  });

  test('1.5 => 00:00:00.002 => 2', () => {
    const ts = Timespan.fromMilliseconds(1.5);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 2 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(2);
  });

  test('12345.6 => 00:00:12.346 => 12346', () => {
    const ts = Timespan.fromMilliseconds(12345.6);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 12, milliseconds: 346 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(12346);
  });

  test('123456789.8 => 1.10:17:36.790 => 123456790', () => {
    const ts = Timespan.fromMilliseconds(123456789.8);
    const result = new Timespan({ days: 1, hours: 10, minutes: 17, seconds: 36, milliseconds: 790 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(123456790);
  });

  test('1234567898765.4 => 14288.23:31:38.765 => 1234567898765', () => {
    const ts = Timespan.fromMilliseconds(1234567898765.4);
    const result = new Timespan({ days: 14288, hours: 23, minutes: 31, seconds: 38, milliseconds: 765 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(1234567898765);
  });

  test('1000 => 00:00:01 => 1000', () => {
    const ts = Timespan.fromMilliseconds(1000);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 1, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(1000);
  });

  test('60000 => 00:01:00 => 60000', () => {
    const ts = Timespan.fromMilliseconds(60000);
    const result = new Timespan({ days: 0, hours: 0, minutes: 1, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(60000);
  });

  test('3600000 <=> 01:00:00', () => {
    const ts = Timespan.fromMilliseconds(3600000);
    const result = new Timespan({ days: 0, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(3600000);
  });

  test('86400000 <=> 1.00:00:00', () => {
    const ts = Timespan.fromMilliseconds(86400000);
    const result = new Timespan({ days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(86400000);
  });

  test('1801220200 <=> 20.20:20:20.200', () => {
    const ts = Timespan.fromMilliseconds(1801220200);
    const result = new Timespan({ days: 20, hours: 20, minutes: 20, seconds: 20, milliseconds: 200 });

    expect(ts).toEqual(result);
    expect(result.totalMilliseconds).toEqual(1801220200);
  });
});
