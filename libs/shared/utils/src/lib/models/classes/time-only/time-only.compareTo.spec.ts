import { TimeOnly } from './time-only';

describe('TimeOnly.compareTo', () => {
  test('Compare two times where the first is earlier', () => {
    const t1 = new TimeOnly({ hour: 8, minute: 30 });
    const t2 = new TimeOnly({ hour: 16, minute: 45 });
    expect(t1.compareTo(t2)).toBe(-1);
  });

  test('Compare two times where the first is later', () => {
    const t1 = new TimeOnly({ hour: 18, minute: 15 });
    const t2 = new TimeOnly({ hour: 9, minute: 45 });
    expect(t1.compareTo(t2)).toBe(1);
  });

  test('Compare two times that are exactly the same', () => {
    const t1 = new TimeOnly({ hour: 12, minute: 30 });
    const t2 = new TimeOnly({ hour: 12, minute: 30 });
    expect(t1.compareTo(t2)).toBe(0);
  });

  test('Compare two times where only seconds differ', () => {
    const t1 = new TimeOnly({ hour: 7, minute: 30, second: 20 });
    const t2 = new TimeOnly({ hour: 7, minute: 30, second: 40 });
    expect(t1.compareTo(t2)).toBe(-1);
  });

  test('Compare times across midnight', () => {
    const t1 = new TimeOnly({ hour: 23, minute: 59, second: 59 });
    const t2 = new TimeOnly({ hour: 0, minute: 0, second: 1 });
    expect(t1.compareTo(t2)).toBe(1);
  });
});
