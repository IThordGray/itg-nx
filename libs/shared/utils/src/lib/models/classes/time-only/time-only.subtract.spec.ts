import { TimeSpan } from '../time-span/time-span';
import { TimeOnly } from './time-only';

describe('TimeOnly.subtract', () => {
  test('Subtract hours wraps to next day', () => {
    const t1 = new TimeOnly({ hours: 1 }); // 01:00 AM
    const ts = new TimeSpan({ hours: 3 }); // 3 hours
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 22 }).toString()); // Should be 22:00 PM previous day
  });

  test('Subtract minutes and seconds', () => {
    const t1 = new TimeOnly({ hours: 14, minutes: 30, seconds: 30 }); // 2:30:30 PM
    const ts = new TimeSpan({ minutes: 45, seconds: 30 }); // 45 minutes and 30 seconds
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 13, minutes: 45 }).toString()); // Should be 1:45:00 PM
  });

  test('Subtract negative TimeSpan add time', () => {
    const t1 = new TimeOnly({ hours: 23, minutes: 30 }); // 00:30 AM
    const ts = new TimeSpan({ hours: -1 }); // -1 hour
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 0, minutes: 30 }).toString()); // Should be 00:30 AM next day
  });

  test('Subtract zero TimeSpan does not change time', () => {
    const t1 = new TimeOnly({ hours: 12 }); // Noon
    const ts = TimeSpan.zero; // 0 hours, 0 minutes
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hours: 12 }).toString()); // Should still be noon
  });

  test('Subtract invalid TimeSpan throws error', () => {
    const t1 = new TimeOnly({ hours: 12 }); // Noon
    expect(() => {
      t1.add(null as any); // Passing null as TimeSpan
    }).toThrowError();
  });
});
