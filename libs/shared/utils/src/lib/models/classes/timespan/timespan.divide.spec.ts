import { Timespan } from './timespan';

const base = new Timespan({ days: 1, hours: 12, minutes: 15, seconds: 16 });

describe('Timespan.divide', () => {

  test('1.12:15:16 / 2 = 18:07:38', () => {
    const result = new Timespan({ hours: 18, minutes: 7, seconds: 38 });
    const ts = 2;
    expect(base.divide(ts)).toEqual(result);
  });

  test('1.12:15:16 / 0.5 = 3.0:30:32', () => {
    const result = new Timespan({ days: 3, hours: 0, minutes: 30, seconds: 32 });
    const ts = 0.5;
    expect(base.divide(ts)).toEqual(result);
  });

  test('00:00:00.501 / 2 = 0.0:00:00.251', () => {
    const result = new Timespan({ milliseconds: 251 });
    const ts = 2;
    expect(Timespan.fromMilliseconds(501).divide(ts)).toEqual(result);
  });

});
