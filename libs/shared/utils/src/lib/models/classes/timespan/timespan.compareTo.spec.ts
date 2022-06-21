import { Timespan } from './timespan';

const base = new Timespan({ hours: 2 });

describe('Timespan.compareTo', () => {
  test('02:00:00 > -00:00:02.5000000 (Compare returns 1)', () => {
    const result = 1;
    const ts = Timespan.fromSeconds(-2.5);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 > 00:20:00 (Compare returns 1)', () => {
    const result = 1;
    const ts = Timespan.fromMinutes(20);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 > 01:00:00 (Compare returns 1)', () => {
    const result = 1;
    const ts = Timespan.fromHours(1);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 > 01:30:00 (Compare returns 1)', () => {
    const result = 1;
    const ts = Timespan.fromMinutes(90);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 = 02:00:00 (Compare returns 0)', () => {
    const result = 0;
    const ts = base;
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 < 12:00:00 (Compare returns -1)', () => {
    const result = -1;
    const ts = Timespan.fromDays(0.5);
    expect(base.compareTo(ts)).toBe(result);
  });

  test('02:00:00 < 1.00:00:00 (Compare returns -1)', () => {
    const result = -1;
    const ts = Timespan.fromDays(1);
    expect(base.compareTo(ts)).toBe(result);
  });
});
