import { Timespan } from './timespan';

const base = new Timespan({ hours: 0, minutes: 15, seconds: 0 });

describe('Timespan.equals', () => {

  test('00:15:00 : 00:15:00 => true', () => {
    const ts = new Timespan({ days: 0, hours: 0, minutes: 15, seconds: 0 });
    expect(Timespan.equals(base, ts)).toEqual(true);
  });

  test('00:15:00 : 00:15:01 => false', () => {
    const ts = new Timespan({ days: 0, hours: 0, minutes: 15, seconds: 1 });
    expect(Timespan.equals(base, ts)).toEqual(false);
  });

});
