import { Timespan } from '../timespan/timespan';
import { TimeOnly } from './time-only';

describe('TimeOnly.add', () => {
  test('Add hours wraps to next day', () => {
    const t1 = new TimeOnly({ hour: 22 }); // 10:00 PM
    const ts = new Timespan({ hours: 3 }); // 3 hours
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 1 }).toString()); // Should be 1:00 AM next day
  });

  test('Add minutes and seconds', () => {
    const t1 = new TimeOnly({ hour: 14, minute: 30, second: 30 }); // 2:30:30 PM
    const ts = new Timespan({ minutes: 45, seconds: 30 }); // 45 minutes and 30 seconds
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 15, minute: 16 }).toString()); // Should be 3:16:00 PM
  });

  test('Add negative Timespan subtracts time', () => {
    const t1 = new TimeOnly({ minute: 30 }); // 00:30 AM
    const ts = new Timespan({ hours: -1 }); // -1 hour
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 23, minute: 30}).toString()); // Should be 11:30 PM previous day
  });

  test('Add zero Timespan does not change time', () => {
    const t1 = new TimeOnly({  hour: 12 }); // Noon
    const ts = Timespan.zero; // 0 hours, 0 minutes
    const result = t1.add(ts);
    expect(result.toString()).toBe(new TimeOnly({ hour: 12 }).toString()); // Should still be noon
  });

  test('Add invalid Timespan throws error', () => {
    const t1 = new TimeOnly({ hour: 12 }); // Noon
    expect(() => {
      t1.add(null as any); // Passing null as Timespan
    }).toThrowError();
  });
});
