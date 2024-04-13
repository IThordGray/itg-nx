import { Timespan } from '../timespan/timespan';
import { TimeOnly } from './time-only';

describe('TimeOnly.subtract', () => {
  test('Subtract hours wraps to next day', () => {
    const t1 = new TimeOnly({ hour: 1 }); // 01:00 AM
    const ts = new Timespan({ hours: 3 }); // 3 hours
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 22 }).toString()); // Should be 22:00 PM previous day
  });

  test('Subtract minutes and seconds', () => {
    const t1 = new TimeOnly({ hour: 14, minute: 30, second: 30 }); // 2:30:30 PM
    const ts = new Timespan({ minutes: 45, seconds: 30 }); // 45 minutes and 30 seconds
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 13, minute: 45 }).toString()); // Should be 1:45:00 PM
  });

  test('Subtract negative Timespan add time', () => {
    const t1 = new TimeOnly({ hour: 23, minute: 30 }); // 00:30 AM
    const ts = new Timespan({ hours: -1 }); // -1 hour
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 0, minute: 30}).toString()); // Should be 00:30 AM next day
  });

  test('Subtract zero Timespan does not change time', () => {
    const t1 = new TimeOnly({  hour: 12 }); // Noon
    const ts = Timespan.zero; // 0 hours, 0 minutes
    const result = t1.subtract(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 12 }).toString()); // Should still be noon
  });

  test('Subtract invalid Timespan throws error', () => {
    const t1 = new TimeOnly({ hour: 12 }); // Noon
    expect(() => {
      t1.add(null as any); // Passing null as Timespan
    }).toThrowError();
  });
});
