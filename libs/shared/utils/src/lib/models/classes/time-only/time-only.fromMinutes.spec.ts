import { OverflowError } from '../../errors/overflow.error';
import { TimeOnly } from './time-only';

describe('TimeOnly.fromMinutes', () => {
  test('Create TimeOnly from minutes', () => {
    const t1 = TimeOnly.fromMinutes(1);
    expect(t1.toString()).toBe(new TimeOnly({ minutes: 1 }).toString());
  });

  test('Create TimeOnly from minutes with overflow to hours', () => {
    const t1 = TimeOnly.fromMinutes(61);
    expect(t1.toString()).toBe(new TimeOnly({ hours: 1, minutes: 1 }).toString());
  });

  test('Create TimeOnly from fractional minutes', () => {
    const t1 = TimeOnly.fromMinutes(0.49);
    expect(t1.toString()).toBe(new TimeOnly({ seconds: 29, milliseconds: 400 }).toString());
  });

  test('Create TimeOnly at boundary (start of day)', () => {
    const t1 = TimeOnly.fromMinutes(0); // 00:00:00 PM
    expect(t1.toString()).toBe(new TimeOnly({}).toString());
  });

  test('Create TimeOnly at boundary (end of day)', () => {
    const t1 = TimeOnly.fromMinutes(1439.98335); // 23:59:59 PM
    expect(t1.toString()).toBe(new TimeOnly({ hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }).toString());
  });

  test('Handle invalid negative hours gracefully', () => {
    expect(() => {
      TimeOnly.fromMinutes(-1);
    }).toThrow(OverflowError);
  });

  test('Handle invalid excessive hours gracefully', () => {
    expect(() => {
      TimeOnly.fromMinutes(1440);
    }).toThrow(OverflowError);
  });
});
