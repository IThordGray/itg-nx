import { Timespan } from './timespan';

describe('Timespan toString() method', () => {
  test('Short format: g', () => {
    const duration = new Timespan({ milliseconds: 36783000 });
    expect(duration.toString('g')).toBe('10:13:03');
  });

  test('Long format: G', () => {
    const duration = new Timespan({ milliseconds: 36783000 });
    expect(duration.toString('G')).toBe('0.10:13:03.000');
  });

  test('Custom format: d.hh:mm:ss.fff', () => {
    const duration = new Timespan({ milliseconds: 36783000 });
    expect(duration.toString('d.hh:mm:ss.fff')).toBe('0.10:13:03.000');
  });

  test('Custom format: dddddddd.hh:mm:ss.fff', () => {
    const duration = new Timespan({ milliseconds: 36783000 });
    expect(duration.toString('dddddddd.hh:mm:ss.fff')).toBe('00000000.10:13:03.000');
  });

  test('Custom format: %h hours, %m minutes, %s seconds', () => {
    const duration = new Timespan({ milliseconds: 36783000 });
    expect(`${duration.toString('h')} hours, ${duration.toString('m')} minutes, ${duration.toString('s')} seconds`).toBe('10 hours, 13 minutes, 3 seconds');
  });

  test('Negative duration: G', () => {
    const duration = new Timespan({ milliseconds: -36783000 });
    expect(duration.toString('G')).toBe('-0.10:13:03.000');
  });

  // Add more tests for other formats as needed
});
