import { TimeOnly } from './time-only';

describe('TimeOnly.compareTo', () => {
  test('Compare two times where the first is earlier', () => {
    const t1 = new TimeOnly({ hours: 8, minutes: 30 });
    const t2 = new TimeOnly({ hours: 16, minutes: 45 });
    expect(t1.compareTo(t2)).toBe(-1);
  });

  test('Compare two times where the first is later', () => {
    const t1 = new TimeOnly({ hours: 18, minutes: 15 });
    const t2 = new TimeOnly({ hours: 9, minutes: 45 });
    expect(t1.compareTo(t2)).toBe(1);
  });

  test('Compare two times that are exactly the same', () => {
    const t1 = new TimeOnly({ hours: 12, minutes: 30 });
    const t2 = new TimeOnly({ hours: 12, minutes: 30 });
    expect(t1.compareTo(t2)).toBe(0);
  });

  test('Compare two times where only seconds differ', () => {
    const t1 = new TimeOnly({ hours: 7, minutes: 30, seconds: 20 });
    const t2 = new TimeOnly({ hours: 7, minutes: 30, seconds: 40 });
    expect(t1.compareTo(t2)).toBe(-1);
  });

  test('Compare times across midnight', () => {
    const t1 = new TimeOnly({ hours: 23, minutes: 59, seconds: 59 });
    const t2 = new TimeOnly({ hours: 0, minutes: 0, seconds: 1 });
    expect(t1.compareTo(t2)).toBe(1);
  });
});
