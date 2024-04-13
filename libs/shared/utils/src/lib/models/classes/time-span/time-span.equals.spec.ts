import { TimeSpan } from './time-span';

const base = new TimeSpan({ hours: 0, minutes: 15, seconds: 0 });

describe('TimeSpan.equals', () => {

  test('00:15:00 : 00:15:00 => true', () => {
    const ts = new TimeSpan({ days: 0, hours: 0, minutes: 15, seconds: 0 });
    expect(base.equals(ts)).toEqual(true);
  });

  test('00:15:00 : 00:15:01 => false', () => {
    const ts = new TimeSpan({ days: 0, hours: 0, minutes: 15, seconds: 1 });
    expect(base.equals(ts)).toEqual(false);
  });

});
