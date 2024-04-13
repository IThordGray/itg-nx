import { TimeOnly } from './time-only';

describe('TimeOnly.isBetween', () => {
  test('Time is exactly at the lower bound', () => {
    const time = new TimeOnly({ hours: 9, minutes: 30 });
    const start = new TimeOnly({ hours: 9, minutes: 30 });
    const end = new TimeOnly({ hours: 17, minutes: 0 });
    expect(time.isBetween(start, end)).toBe(true);
  });

  test('Time is exactly at the upper bound', () => {
    const time = new TimeOnly({ hours: 17, minutes: 0 });
    const start = new TimeOnly({ hours: 9, minutes: 30 });
    const end = new TimeOnly({ hours: 17, minutes: 0 });
    expect(time.isBetween(start, end)).toBe(false);
  });

  test('Time is between the bounds', () => {
    const time = new TimeOnly({ hours: 12, minutes: 0 });
    const start = new TimeOnly({ hours: 9, minutes: 30 });
    const end = new TimeOnly({ hours: 17, minutes: 0 });
    expect(time.isBetween(start, end)).toBe(true);
  });

  test('Time is below the lower bound', () => {
    const time = new TimeOnly({ hours: 9, minutes: 29 });
    const start = new TimeOnly({ hours: 9, minutes: 30 });
    const end = new TimeOnly({ hours: 17, minutes: 0 });
    expect(time.isBetween(start, end)).toBe(false);
  });

  test('Time is above the upper bound', () => {
    const time = new TimeOnly({ hours: 17, minutes: 0 });
    const start = new TimeOnly({ hours: 9, minutes: 30 });
    const end = new TimeOnly({ hours: 17, minutes: 0 });
    expect(time.isBetween(start, end)).toBe(false);
  });
});
