import { OverflowError } from '../../errors/overflow.error';
import { TimeOnly } from './time-only';

describe('TimeOnly.fromSeconds', () => {
  test('Create TimeOnly from seconds', () => {
    const t1 = TimeOnly.fromSeconds(1);
    expect(t1.toString()).toBe(new TimeOnly({ second: 1 }).toString());
  });

  test('Create TimeOnly from seconds with overflow to minutes', () => {
    const t1 = TimeOnly.fromSeconds(61);
    expect(t1.toString()).toBe(new TimeOnly({ minute: 1, second: 1 }).toString());
  });

  test('Create TimeOnly from seconds with overflow to hours', () => {
    const t1 = TimeOnly.fromSeconds(3661);
    expect(t1.toString()).toBe(new TimeOnly({ hour: 1, minute: 1, second: 1 }).toString());
  });

  test('Create TimeOnly from fractional seconds', () => {
    const t1 = TimeOnly.fromSeconds(0.5);
    expect(t1.toString()).toBe(new TimeOnly({ millisecond: 500 }).toString());
  });

  test('Create TimeOnly at boundary (start of day)', () => {
    const t1 = TimeOnly.fromSeconds(0); // 00:00:00 PM
    expect(t1.toString()).toBe(new TimeOnly({}).toString());
  });

  test('Create TimeOnly at boundary (end of day)', () => {
    const t1 = TimeOnly.fromSeconds(86399.001); // 23:59:59 PM
    expect(t1.toString()).toBe(new TimeOnly({ hour: 23, minute: 59, second: 59, millisecond: 999 }).toString());
  });

  test('Handle invalid negative hours gracefully', () => {
    expect(() => {
      TimeOnly.fromSeconds(-1);
    }).toThrow(OverflowError);
  });

  test('Handle invalid excessive hours gracefully', () => {
    expect(() => {
      TimeOnly.fromSeconds(86400);
    }).toThrow(OverflowError);
  });
});
