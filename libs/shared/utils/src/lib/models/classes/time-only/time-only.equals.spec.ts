import { TimeOnly } from './time-only';

describe('TimeOnly.equals', () => {
  test('Two times that are exactly the same', () => {
    const t1 = new TimeOnly({ hours: 12, minutes: 30, seconds: 45, milliseconds: 300 });
    const t2 = new TimeOnly({ hours: 12, minutes: 30, seconds: 45, milliseconds: 300 });
    expect(t1.equals(t2)).toBe(true);
  });

  test('Two times that differ in hours', () => {
    const t1 = new TimeOnly({ hours: 14, minutes: 30 });
    const t2 = new TimeOnly({ hours: 12, minutes: 30 });
    expect(t1.equals(t2)).toBe(false);
  });

  test('Two times that differ in minutes', () => {
    const t1 = new TimeOnly({ hours: 12, minutes: 31 });
    const t2 = new TimeOnly({ hours: 12, minutes: 30 });
    expect(t1.equals(t2)).toBe(false);
  });

  test('Two times that differ in seconds', () => {
    const t1 = new TimeOnly({ hours: 12, minutes: 30, seconds: 10 });
    const t2 = new TimeOnly({ hours: 12, minutes: 30, seconds: 20 });
    expect(t1.equals(t2)).toBe(false);
  });

  test('Two times that differ in milliseconds', () => {
    const t1 = new TimeOnly({ hours: 12, minutes: 30, seconds: 20, milliseconds: 100 });
    const t2 = new TimeOnly({ hours: 12, minutes: 30, seconds: 20, milliseconds: 200 });
    expect(t1.equals(t2)).toBe(false);
  });
});
