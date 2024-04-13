import { TimeSpan } from './time-span';

const base = new TimeSpan({ days: 1, hours: 12, minutes: 15, seconds: 16 });

describe('TimeSpan.subtract', () => {
  test('1:12:15:16 - 1:12:00:00.000 = 0:00:15:16.000', () => {
    const result = new TimeSpan({ days: 0, hours: 0, minutes: 15, seconds: 16 });
    const ts = TimeSpan.fromDays(1.5);
    expect(base.subtract(ts)).toEqual(result);
  });

  test('1:12:15:16 - 0:01:30:00.000 = 1:10:45:16.000', () => {
    const result = new TimeSpan({ days: 1, hours: 10, minutes: 45, seconds: 16 });
    const ts = TimeSpan.fromHours(1.5);
    expect(base.subtract(ts)).toEqual(result);
  });

  test('1:12:15:16 - 0:00:45:00.000 = 1:11:30:16.000 ', () => {
    const result = new TimeSpan({ days: 1, hours: 11, minutes: 30, seconds: 16 });
    const ts = TimeSpan.fromMinutes(45);
    expect(base.subtract(ts)).toEqual(result);
  });

  test('1:12:15:16 - 0:00:00:00.505 = 1:12:15:15.495', () => {
    const result = new TimeSpan({ days: 1, hours: 12, minutes: 15, seconds: 15, milliseconds: 495 });
    const ts = TimeSpan.fromMilliseconds(505);
    expect(base.subtract(ts)).toEqual(result);
  });

  test('1:12:15:16 - 1:17:32:20.000 = -0:05:17:04.000', () => {
    const result = new TimeSpan({ days: -0, hours: -5, minutes: -17, seconds: -4, milliseconds: -0 });
    const ts = new TimeSpan({ days: 1, hours: 17, minutes: 32, seconds: 20 });
    expect(base.subtract(ts)).toEqual(result);
  });

  test('1:12:15:16 - -0:07:30:00.000 = 1:19:45:16.000', () => {
    const result = new TimeSpan({ days: 1, hours: 19, minutes: 45, seconds: 16 });
    const ts = new TimeSpan({ hours: -8, minutes: 30 });
    expect(base.subtract(ts)).toEqual(result);
  });
});
