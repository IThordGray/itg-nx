import { TimeOnly } from './time-only';

describe('TimeOnly.isBetween', () => {
  test('Time is exactly at the lower bound', () => {
    const time = new TimeOnly({ hour: 9, minute: 30 });
    const start = new TimeOnly({ hour: 9, minute: 30 });
    const end = new TimeOnly({ hour: 17, minute: 0 });
    expect(time.isBetween(start, end)).toBe(true);
  });

  test('Time is exactly at the upper bound', () => {
    const time = new TimeOnly({ hour: 17, minute: 0 });
    const start = new TimeOnly({ hour: 9, minute: 30 });
    const end = new TimeOnly({ hour: 17, minute: 0 });
    expect(time.isBetween(start, end)).toBe(false);
  });

  test('Time is between the bounds', () => {
    const time = new TimeOnly({ hour: 12, minute: 0 });
    const start = new TimeOnly({ hour: 9, minute: 30 });
    const end = new TimeOnly({ hour: 17, minute: 0 });
    expect(time.isBetween(start, end)).toBe(true);
  });

  test('Time is below the lower bound', () => {
    const time = new TimeOnly({ hour: 9, minute: 29 });
    const start = new TimeOnly({ hour: 9, minute: 30 });
    const end = new TimeOnly({ hour: 17, minute: 0 });
    expect(time.isBetween(start, end)).toBe(false);
  });

  test('Time is above the upper bound', () => {
    const time = new TimeOnly({ hour: 17, minute: 0 });
    const start = new TimeOnly({ hour: 9, minute: 30 });
    const end = new TimeOnly({ hour: 17, minute: 0 });
    expect(time.isBetween(start, end)).toBe(false);
  });
});
