import { TimeOnly } from './time-only';

describe('TimeOnly', () => {
  test('new TimeOnly({ milliseconds: 1000}) => 00:00:01', () => {
    const result = '00:00:01';
    const ts = new TimeOnly({ milliseconds: 1000 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeOnly({ seconds: 60}) => 00:01:00', () => {
    const result = '00:01:00';
    const ts = new TimeOnly({ seconds: 60 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeOnly({ minutes: 60}) => 01:00:00', () => {
    const result = '01:00:00';
    const ts = new TimeOnly({ minutes: 60 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeOnly({ hours: 24}) => 1.00:00:00', () => {
    const result = '00:00:00';
    const ts = new TimeOnly({ hours: 24 });
    expect(ts.toString()).toEqual(result);
  });

  test('new TimeOnly({ seconds: 120 }) => 00:02:00', () => {
    const result = '00:02:00';
    const ts = new TimeOnly({ seconds: 120 });
    expect(ts.toString()).toEqual(result);
  });

  test('TimeOnly correctly extracts time from Date in local time zone', () => {
    const localDate = new Date('2024-04-12T12:34:56'); // This will use the system's local time zone
    const timeOnly = TimeOnly.fromDateTime(localDate);

    expect(timeOnly.hour).toBe(localDate.getHours());
    expect(timeOnly.minute).toBe(localDate.getMinutes());
    expect(timeOnly.second).toBe(localDate.getSeconds());
  });

  test('TimeOnly correctly represents time when converted at UTC', () => {
    const date = new Date('2024-04-12T12:34:56.000z'); // This will use the system's local time zone
    const timeOnly = TimeOnly.fromDateTime(date);

    // The test must check that the TimeOnly created from UTC date reflects the local time
    expect(timeOnly.hour).toBe(date.getHours());
    expect(timeOnly.minute).toBe(date.getMinutes());
    expect(timeOnly.second).toBe(date.getSeconds());
  });

  test('TimeOnly correctly represents time when converted across time zones', () => {
    const date = new Date('2024-04-12T12:34:56.000+04:00'); // This will use the system's local time zone
    const timeOnly = TimeOnly.fromDateTime(date);

    // The test must check that the TimeOnly created from UTC date reflects the local time
    expect(timeOnly.hour).toBe(date.getHours());
    expect(timeOnly.minute).toBe(date.getMinutes());
    expect(timeOnly.second).toBe(date.getSeconds());
  });

});
