import { TimeSpan } from './time-span';

const base = new TimeSpan({ hours: 2 });

describe('TimeSpan.compareTo', () => {
  test('02:00:00 > -00:00:02.5000000 (Compare returns 1)', () => {
    const result = 1;
    const ts = TimeSpan.fromSeconds(-2.5);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 > 00:20:00 (Compare returns 1)', () => {
    const result = 1;
    const ts = TimeSpan.fromMinutes(20);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 > 01:00:00 (Compare returns 1)', () => {
    const result = 1;
    const ts = TimeSpan.fromHours(1);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 > 01:30:00 (Compare returns 1)', () => {
    const result = 1;
    const ts = TimeSpan.fromMinutes(90);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 = 02:00:00 (Compare returns 0)', () => {
    const result = 0;
    const ts = base;
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 < 12:00:00 (Compare returns -1)', () => {
    const result = -1;
    const ts = TimeSpan.fromDays(0.5);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 < 1.00:00:00 (Compare returns -1)', () => {
    const result = -1;
    const ts = TimeSpan.fromDays(1);
    expect(base.compareTo(ts)).toBe(result);
  });
});
