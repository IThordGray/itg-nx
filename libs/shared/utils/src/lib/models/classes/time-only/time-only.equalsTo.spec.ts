import { TimeOnly } from './time-only';

describe('TimeOnly.equals', () => {
  test('Two times that are exactly the same', () => {
    const t1 = new TimeOnly({ hour: 12, minute: 30, second: 45, millisecond: 300 });
    const t2 = new TimeOnly({ hour: 12, minute: 30, second: 45, millisecond: 300 });
    expect(t1.equalsTo(t2)).toBe(true);
  });

  test('Two times that differ in hours', () => {
    const t1 = new TimeOnly({ hour: 14, minute: 30 });
    const t2 = new TimeOnly({ hour: 12, minute: 30 });
    expect(t1.equalsTo(t2)).toBe(false);
  });

  test('Two times that differ in minutes', () => {
    const t1 = new TimeOnly({ hour: 12, minute: 31 });
    const t2 = new TimeOnly({ hour: 12, minute: 30 });
    expect(t1.equalsTo(t2)).toBe(false);
  });

  test('Two times that differ in seconds', () => {
    const t1 = new TimeOnly({ hour: 12, minute: 30, second: 10 });
    const t2 = new TimeOnly({ hour: 12, minute: 30, second: 20 });
    expect(t1.equalsTo(t2)).toBe(false);
  });

  test('Two times that differ in milliseconds', () => {
    const t1 = new TimeOnly({ hour: 12, minute: 30, second: 20, millisecond: 100 });
    const t2 = new TimeOnly({ hour: 12, minute: 30, second: 20, millisecond: 200 });
    expect(t1.equalsTo(t2)).toBe(false);
  });
});
