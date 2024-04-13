import { TimeSpan } from './time-span';

const base = new TimeSpan({ days: 1, hours: 12, minutes: 15, seconds: 16 });

describe('TimeSpan.multiply', () => {

  test('1.12:15:16 * 2 = 3.0:30:32', () => {
    const result = new TimeSpan({ days: 3, hours: 0, minutes: 30, seconds: 32 });
    const ts = 2;
    expect(base.multiply(ts)).toEqual(result);
  });

  test('1.12:15:16 * 0.5 = 18:07:38', () => {
    const result = new TimeSpan({ hours: 18, minutes: 7, seconds: 38 });
    const ts = 0.5;
    expect(base.multiply(ts)).toEqual(result);
  });

  test('00:00:00.501 * 2 = 0.0:00:01.2', () => {
    const result = new TimeSpan({ seconds: 1, milliseconds: 2 });
    const ts = 2;
    expect(TimeSpan.fromMilliseconds(501).multiply(ts)).toEqual(result);
  });

});
