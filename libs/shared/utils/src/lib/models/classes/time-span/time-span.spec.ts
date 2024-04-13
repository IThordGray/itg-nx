import { TimeSpan } from './time-span';

describe('TimeSpan', () => {

  test('new TimeSpan({ milliseconds: 1000}) => 00:00:01', () => {
    const result = '00:00:01';
    const ts = new TimeSpan({ milliseconds: 1000 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeSpan({ seconds: 60}) => 00:01:00', () => {
    const result = '00:01:00';
    const ts = new TimeSpan({ seconds: 60 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeSpan({ minutes: 60}) => 01:00:00', () => {
    const result = '01:00:00';
    const ts = new TimeSpan({ minutes: 60 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeSpan({ hours: 24}) => 1.00:00:00', () => {
    const result = '1.00:00:00';
    const ts = new TimeSpan({ hours: 24 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeSpan({ seconds: 120 }) => 00:02:00', () => {
    const result = '00:02:00';
    const ts = new TimeSpan({ seconds: 120 });
    expect(ts.toString()).toEqual(result);
  });
});
