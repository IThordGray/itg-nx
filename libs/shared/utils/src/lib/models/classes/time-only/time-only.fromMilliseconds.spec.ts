import { OverflowError } from '../../errors/overflow.error';
import { TimeOnly } from './time-only';

describe('TimeOnly.fromMilliseconds', () => {
  test('Create TimeOnly from milliseconds', () => {
    const t1 = TimeOnly.fromMilliseconds(1);
    expect(t1.toString()).toBe(new TimeOnly({ millisecond: 1 }).toString());
  });

  test('Create TimeOnly from milliseconds with overflow to seconds', () => {
    const t1 = TimeOnly.fromMilliseconds(1001);
    expect(t1.toString()).toBe(new TimeOnly({ second: 1, millisecond: 1 }).toString());
  });

  test('Create TimeOnly from milliseconds with overflow to minutes', () => {
    const t1 = TimeOnly.fromMilliseconds(61001);
    expect(t1.toString()).toBe(new TimeOnly({ minute: 1, second: 1, millisecond: 1 }).toString());
  });

  test('Create TimeOnly from milliseconds with overflow to hours', () => {
    const t1 = TimeOnly.fromMilliseconds(3661001);
    expect(t1.toString()).toBe(new TimeOnly({ hour: 1, minute: 1, second: 1, millisecond: 1 }).toString());
  });

  test('Create TimeOnly at boundary (start of day)', () => {
    const t1 = TimeOnly.fromMilliseconds(0); // 00:00:00 PM
    expect(t1.toString()).toBe(new TimeOnly({}).toString());
  });

  test('Create TimeOnly at boundary (end of day)', () => {
    const t1 = TimeOnly.fromMilliseconds(86399999); // 23:59:59 PM
    expect(t1.toString()).toBe(new TimeOnly({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toString());
  });

  test('Handle invalid negative hours gracefully', () => {
    expect(() => {
      TimeOnly.fromMilliseconds(-1);
    }).toThrow(OverflowError);
  });

  test('Handle invalid excessive hours gracefully', () => {
    expect(() => {
      TimeOnly.fromMilliseconds(86400000);
    }).toThrow(OverflowError);
  });
});
