import { Timespan } from './timespan';

describe('Timespan.getHashCode', () => {
  test('00:00:00 = 0', () => {
    const result = 0;
    const ts = new Timespan({});
    expect(ts.getHashCode()).toEqual(result);
  });

  test('00:00:00.001 = 1', () => {
    const result = 1;
    const ts = new Timespan({ milliseconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('00:00:01 = 1000', () => {
    const result = 1000;
    const ts = new Timespan({ seconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('00:01:00 = 60000', () => {
    const result = 60000;
    const ts = new Timespan({ minutes: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('01:00:00 = 3600000', () => {
    const result = 3600000;
    const ts = new Timespan({ hours: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('01:00:00.001 = 3600001', () => {
    const result = 3600001;
    const ts = new Timespan({ hours: 1, milliseconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('01:00:01 = 3601000', () => {
    const result = 3601000;
    const ts = new Timespan({ hours: 1, seconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('1.00:00:00 = 86400000', () => {
    const result = 86400000;
    const ts = new Timespan({ days: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('1.00:00:00.001 = 86400001', () => {
    const result = 86400001;
    const ts = new Timespan({ days: 1, milliseconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('1.00:00:01 = 86401000', () => {
    const result = 86401000;
    const ts = new Timespan({ days: 1, seconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('100.00:00:00 = 50065408', () => {
    const result = 50065408;
    const ts = new Timespan({ days: 100 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('100.00:00:00.001 = 50065409', () => {
    const result = 50065409;
    const ts = new Timespan({ days: 100, milliseconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

  test('100.00:00:01 = 50066408', () => {
    const result = 50066408;
    const ts = new Timespan({ days: 100, seconds: 1 });
    expect(ts.getHashCode()).toEqual(result);
  });

});
