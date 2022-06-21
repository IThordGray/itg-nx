import { Timespan } from "./timespan";

describe('Timespan.fromDays =. Timestamp.fromDays', () => {
  test('0.00012 => 00:00:10.368 => 0.00012', () => {
    const ts = Timespan.fromDays(0.00012);
    const result = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 10, milliseconds: 368 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(0.00012);
  });

  test('1.23457 => 1.05:37:46.848 => 1.23457', () => {
    const ts = Timespan.fromDays(1.23457);
    const result = new Timespan({ days: 1, hours: 5, minutes: 37, seconds: 46, milliseconds: 848 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(1.23457);
  });

  test('12345.67899 => 12345.16:17:44.736 => 12345.67899', () => {
    const ts = Timespan.fromDays(12345.67899);
    const result = new Timespan({ days: 12345, hours: 16, minutes: 17, seconds: 44, milliseconds: 736 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(12345.67899);
  });

  test('0.0007 => 00:01:480 => 0.0007', () => {
    const ts = Timespan.fromDays(0.0007);
    const result = new Timespan({ days: 0, hours: 0, minutes: 1, seconds: 0, milliseconds: 480 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(0.0007);
  });

  test('0.04167 => 01:00:00.288 => 0.04167', () => {
    const ts = Timespan.fromDays(0.04167);
    const result = new Timespan({ days: 0, hours: 1, minutes: 0, seconds: 0, milliseconds: 288 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(0.04167);
  });

  test('1 => 1.00:00:00 => 1', () => {
    const ts = Timespan.fromDays(1);
    const result = new Timespan({ days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(1);
  });

  test('20.84746 => 20.20:20:20.544 => 20.84746', () => {
    const ts = Timespan.fromDays(20.84746);
    const result = new Timespan({ days: 20, hours: 20, minutes: 20, seconds: 20, milliseconds: 544 });
    expect(ts).toEqual(result);
    expect(result.totalDays).toEqual(20.84746);
  });
});

// describe('Timespan.totalDays', () => {
//   test('00:00:10.368 => 0.00012', () => {
//     const result = 0.00012;
//     const ts = new Timespan({ days: 0, hours: 0, minutes: 0, seconds: 10, milliseconds: 368 });
//     expect(ts.totalDays).toEqual(result);
//   });
//
//   test('1.05:37:46.848 => 1.23457', () => {
//     const result = 1.23457;
//     const ts = new Timespan({ days: 1, hours: 5, minutes: 37, seconds: 46, milliseconds: 848 });
//     expect(ts.totalDays).toEqual(result);
//   });
//
//   test('12345.16:17:44.736 => 12345.67899', () => {
//     const result = 12345.67899;
//     const ts = new Timespan({ days: 12345, hours: 16, minutes: 17, seconds: 44, milliseconds: 736 });
//     expect(ts.totalDays).toEqual(result);
//   });
//
//   test('00:01:480 => 0.0007', () => {
//     const result = 0.0007;
//     const ts = new Timespan({ days: 0, hours: 0, minutes: 1, seconds: 0, milliseconds: 480 });
//     expect(ts.totalDays).toEqual(result);
//   });
//
//   test('01:00:00.288 => 0.04167', () => {
//     const result = 0.04167;
//     const ts = new Timespan({ days: 0, hours: 1, minutes: 0, seconds: 0, milliseconds: 288 });
//     expect(ts.totalDays).toEqual(result);
//   });
//
//   test('1.00:00:00 => 1', () => {
//     const result = 1;
//     const ts = new Timespan({ days: 1, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
//     expect(ts.totalDays).toEqual(result);
//   });
//
//   test('20.20:20:20.544 => 20.84746', () => {
//     const result = 20.84746;
//     const ts = new Timespan({ days: 20, hours: 20, minutes: 20, seconds: 20, milliseconds: 544 });
//     expect(ts.totalDays).toEqual(result);
//   });
// });
