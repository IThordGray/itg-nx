import { TimeSpan } from '../time-span/time-span';
import { TimeOnly } from './time-only';

describe('TimeOnly.add', () => {
  test('Add hours wraps to next day', () => {
    const t1 = new TimeOnly({ hours: 22 }); // 10:00 PM
    const ts = new TimeSpan({ hours: 3 }); // 3 hours
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 1 }).toString()); // Should be 1:00 AM next day
  });

  test('Add minutes and seconds', () => {
    const t1 = new TimeOnly({ hours: 14, minutes: 30, seconds: 30 }); // 2:30:30 PM
    const ts = new TimeSpan({ minutes: 45, seconds: 30 }); // 45 minutes and 30 seconds
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 15, minutes: 16 }).toString()); // Should be 3:16:00 PM
  });

  test('Add negative TimeSpan subtracts time', () => {
    const t1 = new TimeOnly({ minutes: 30 }); // 00:30 AM
    const ts = new TimeSpan({ hours: -1 }); // -1 hour
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 23, minutes: 30 }).toString()); // Should be 11:30 PM previous day
  });

  test('Add zero TimeSpan does not change time', () => {
    const t1 = new TimeOnly({ hours: 12 }); // Noon
    const ts = TimeSpan.zero; // 0 hours, 0 minutes
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 12 }).toString()); // Should still be noon
  });

  test('Add invalid TimeSpan throws error', () => {
    const t1 = new TimeOnly({ hours: 12 }); // Noon
    expect(() => {
      t1.add(null as any); // Passing null as TimeSpan
    }).toThrowError();
  });
});
