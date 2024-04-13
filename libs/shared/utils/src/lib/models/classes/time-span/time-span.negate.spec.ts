import { TimeSpan } from './time-span';

describe('TimeSpan.negate', () => {
  test('-00:00:00.001 => -00:00:00.001', () => {
    const result = new TimeSpan({ milliseconds: -1 }).totalMilliseconds;
    const ts = new TimeSpan({ milliseconds: 1 });
    expect(ts.negate().totalMilliseconds).toEqual(result);
  });

  test('-00:00:00.123 => 00:00:00.123', () => {
    const result = new TimeSpan({ milliseconds: 123 }).totalMilliseconds;
    const ts = new TimeSpan({ milliseconds: -123 });
    expect(ts.negate().totalMilliseconds).toEqual(result);
  });

  test('00:09:39.970 => -00:09:39.970', () => {
    const result = new TimeSpan({ minutes: -9, seconds: -39, milliseconds: -970 }).totalMilliseconds;
    const ts = new TimeSpan({ minutes: 10, seconds: -20, milliseconds: -30 });
    expect(ts.negate().totalMilliseconds).toEqual(result);
  });

  test('-09:40:29.960 => 09:40:29.960', () => {
    const result = new TimeSpan({ hours: 9, minutes: 40, seconds: 29, milliseconds: 960 }).totalMilliseconds;
    const ts = new TimeSpan({ hours: -9, minutes: -40, seconds: -29, milliseconds: -960 });
    expect(ts.negate().totalMilliseconds).toEqual(result);
  });

  test('-1.10:20:40.160n => 1.10:20:40.160', () => {
    const result = new TimeSpan({ days: 1, hours: 10, minutes: 20, seconds: 40, milliseconds: 160 }).totalMilliseconds;
    const ts = new TimeSpan({ days: -1, hours: -10, minutes: -20, seconds: -40, milliseconds: -160 });
    expect(ts.negate().totalMilliseconds).toEqual(result);
  });

  test('10.20:30:40.050 => -10.20:30:40.050', () => {
    const result = new TimeSpan({
      days: -10,
      hours: -20,
      minutes: -30,
      seconds: -40,
      milliseconds: -50
    }).totalMilliseconds;
    const ts = new TimeSpan({ days: 10, hours: 20, minutes: 30, seconds: 40, milliseconds: 50 });
    expect(ts.negate().totalMilliseconds).toEqual(result);
  });
});
