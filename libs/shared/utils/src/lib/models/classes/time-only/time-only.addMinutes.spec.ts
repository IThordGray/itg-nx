import { TimeOnly } from './time-only';

describe('TimeOnly.addMinutes', () => {
  test('Adds minutes without wrapping into the next hour', () => {
    const time = new TimeOnly({ hours: 10, minutes: 30 });
    const newTime = time.addMinutes(20);
    expect(newTime.toString()).toBe('10:50:00');
  });

  test('Adds minutes with wrapping into the next hour', () => {
    const time = new TimeOnly({ hours: 10, minutes: 50 });
    const newTime = time.addMinutes(15);
    expect(newTime.toString()).toBe('11:05:00');
  });

  test('Subtracts minutes with wrapping into the previous hour', () => {
    const time = new TimeOnly({ hours: 10, minutes: 10 });
    const newTime = time.addMinutes(-20);
    expect(newTime.toString()).toBe('09:50:00');
  });

  test('Adds zero minutes', () => {
    const time = new TimeOnly({ hours: 12, minutes: 30 });
    const newTime = time.addMinutes(0);
    expect(newTime.toString()).toBe('12:30:00');
  });

  test('Adds minutes to reach exactly midnight', () => {
    const time = new TimeOnly({ hours: 23, minutes: 45 });
    const newTime = time.addMinutes(15);
    expect(newTime.toString()).toBe('00:00:00');
  });

  test('Subtracts minutes to reach exactly midnight', () => {
    const time = new TimeOnly({ minutes: 15 });
    const newTime = time.addMinutes(-15);
    expect(newTime.toString()).toBe('00:00:00');
  });

  test('Adds a large number of minutes to test multiple hour wrapping', () => {
    const time = new TimeOnly({ hours: 10 });
    const newTime = time.addMinutes(480);  // Adding 480 minutes (8 hours)
    expect(newTime.toString()).toBe('18:00:00');
  });

  test('Subtracts a large number of minutes to test multiple hour wrapping', () => {
    const time = new TimeOnly({ hours: 10 });
    const newTime = time.addMinutes(-480);  // Subtracting 480 minutes (8 hours)
    expect(newTime.toString()).toBe('02:00:00');
  });
});
