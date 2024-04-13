import { TimeSpan } from './time-span';

const base = new TimeSpan({ days: 1, hours: 12, minutes: 15, seconds: 16 });

describe('TimeSpan.add', () => {
  test('1:12:15:16 + 1:12:00:00.000 = 3:00:15:16.000', () => {
    const result = new TimeSpan({ days: 3, hours: 0, minutes: 15, seconds: 16 });
    const ts = TimeSpan.fromDays(1.5);
    expect(base.add(ts)).toEqual(result);
  });

  test('1:12:15:16 + 0:01:30:00.000 = 1:13:45:16.000', () => {
    const result = new TimeSpan({ days: 1, hours: 13, minutes: 45, seconds: 16 });
    const ts = TimeSpan.fromHours(1.5);
    expect(base.add(ts)).toEqual(result);
  });

  test('1:12:15:16 + 0:00:45:00.000 = 1:13:00:16.000', () => {
    const result = new TimeSpan({ days: 1, hours: 13, minutes: 0, seconds: 16 });
    const ts = TimeSpan.fromMinutes(45);
    expect(base.add(ts)).toEqual(result);
  });

  test('1:12:15:16 + 0:00:00:00.505 = 1:12:15:16.505', () => {
    const result = new TimeSpan({ days: 1, hours: 12, minutes: 15, seconds: 16, milliseconds: 505 });
    const ts = TimeSpan.fromMilliseconds(505);
    expect(base.add(ts)).toEqual(result);
  });

  test('1:12:15:16 + 1:17:32:20.000 = 3:05:47:36.000', () => {
    const result = new TimeSpan({ days: 3, hours: 5, minutes: 47, seconds: 36 });
    const ts = new TimeSpan({ days: 1, hours: 17, minutes: 32, seconds: 20 });
    expect(base.add(ts)).toEqual(result);
  });

  test('1:12:15:16 + -0:07:30:00.000 = 1:04:45:16.000', () => {
    const result = new TimeSpan({ days: 1, hours: 4, minutes: 45, seconds: 16 });
    const ts = new TimeSpan({ hours: -8, minutes: 30 });
    expect(base.add(ts)).toEqual(result);
  });
});
