import { TimeOnly } from './time-only';

describe('TimeOnly.addHours', () => {
  test('Adds hours without wrapping', () => {
    const time = new TimeOnly({ hour: 10, minute: 30 });
    const newTime = time.addHours(5);
    expect(newTime.toString()).toBe('15:30:00');
  });

  test('Adds hours with forward wrapping', () => {
    const time = new TimeOnly({ hour:22, minute: 15 });
    const newTime = time.addHours(4);
    expect(newTime.toString()).toBe('02:15:00');
  });

  test('Adds hours with backward wrapping', () => {
    const time = new TimeOnly({ hour: 1, minute: 45 });
    const newTime = time.addHours(-3);
    expect(newTime.toString()).toBe('22:45:00');
  });

  test('Adds zero hours', () => {
    const time = new TimeOnly({ hour: 12 });
    const newTime = time.addHours(0);
    expect(newTime.toString()).toBe('12:00:00');
  });

  test('Adds negative hours to reach midnight', () => {
    const time = new TimeOnly({ hour: 3 });
    const newTime = time.addHours(-3);
    expect(newTime.toString()).toBe('00:00:00');
  });

  test('Adds a large number of hours to test multiple wrapping', () => {
    const time = new TimeOnly({ hour: 5 });
    const newTime = time.addHours(48);  // Adding 48 should keep the time the same
    expect(newTime.toString()).toBe('05:00:00');
  });

  test('Subtracts a large number of hours to test multiple wrapping', () => {
    const time = new TimeOnly({ hour: 5 });
    const newTime = time.addHours(-48);  // Subtracting 48 should keep the time the same
    expect(newTime.toString()).toBe('05:00:00');
  });
});
