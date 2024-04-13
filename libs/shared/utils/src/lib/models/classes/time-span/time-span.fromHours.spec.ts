import { TimeSpan } from './time-span';

describe('TimeSpan.fromHours => TimeSpan.totalHours', () => {
  test('0.00123 => 00:00:04.428 => 0.00123', () => {
    const ts = TimeSpan.fromHours(0.00123);
    const result = new TimeSpan({ days: 0, hours: 0, minutes: 0, seconds: 4, milliseconds: 428 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(0.00123);
  });

  test('12.34568 => 12:20:44.448 => 12.34568', () => {
    const ts = TimeSpan.fromHours(12.34568);
    const result = new TimeSpan({ days: 0, hours: 12, minutes: 20, seconds: 44, milliseconds: 448 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(12.34568);
  });

  test('123456.78988 => 5144.00:47:23.568 => 123456.78988', () => {
    const ts = TimeSpan.fromHours(123456.78988);
    const result = new TimeSpan({ days: 5144, hours: 0, minutes: 47, seconds: 23, milliseconds: 568 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(123456.78988);
  });

  test('0.00028 => 00:00:01.008 => 0.00028', () => {
    const ts = TimeSpan.fromHours(0.00028);
    const result = new TimeSpan({ days: 0, hours: 0, minutes: 0, seconds: 1, milliseconds: 8 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(0.00028);
  });

  test('0.01667 => 00:01:00.12 => 0.01667', () => {
    const ts = TimeSpan.fromHours(0.01667);
    const result = new TimeSpan({ days: 0, hours: 0, minutes: 1, seconds: 0, milliseconds: 12 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(0.01667);
  });

  test('1 => 01:00:00 => 1', () => {
    const ts = TimeSpan.fromHours(1);
    const result = new TimeSpan({ days: 0, hours: 1, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(1);
  });

  test('24 => 1.00:00:00 => 24', () => {
    const ts = TimeSpan.fromHours(24);
    const result = new TimeSpan({ days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(24);
  });

  test('500.3389445 => 20.20:20:20.200 => 500.33894', () => {
    const ts = TimeSpan.fromHours(500.3389445);
    const result = new TimeSpan({ days: 20, hours: 20, minutes: 20, seconds: 20, milliseconds: 200 });

    expect(ts).toEqual(result);
    expect(result.totalHours).toEqual(500.33894);
  });
});
