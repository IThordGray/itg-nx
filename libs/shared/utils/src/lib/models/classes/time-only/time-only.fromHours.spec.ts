import { OverflowError } from '../../errors/overflow.error';
import { TimeOnly } from './time-only';

describe('TimeOnly.fromHours', () => {
  test('Create TimeOnly from whole hours', () => {
    const t1 = TimeOnly.fromHours(15); // 3:00 PM
    expect(t1.toString()).toBe(new TimeOnly({ hour: 15 }).toString());
  });

  test('Create TimeOnly at boundary (midnight)', () => {
    const t1 = TimeOnly.fromHours(0); // Midnight
    expect(t1.toString()).toBe(new TimeOnly({ hour: 0 }).toString());
  });

  test('Create TimeOnly at boundary (end of day)', () => {
    const t1 = TimeOnly.fromHours(23); // 11:00 PM
    expect(t1.toString()).toBe(new TimeOnly({ hour: 23 }).toString());
  });

  test('Handle invalid negative hours gracefully', () => {
    expect(() => {
      TimeOnly.fromHours(-1);
    }).toThrow(OverflowError);
  });

  test('Handle invalid excessive hours gracefully', () => {
    expect(() => {
      TimeOnly.fromHours(24);
    }).toThrow(OverflowError);
  });

  test('Create TimeOnly from fractional hours', () => {
    const t1 = TimeOnly.fromHours(14.75); // Should be considered as 14:45
    expect(t1.toString()).toBe(new TimeOnly({ hour: 14, minute: 45 }).toString());
  });
});
