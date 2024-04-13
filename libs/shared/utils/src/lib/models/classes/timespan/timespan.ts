import { isNullOrWhiteSpace } from '../../../helpers/is-null-or-whitespace.helper';
import { ArgumentNullError } from '../../errors/argument-null.error';
import { ArgumentError } from '../../errors/argument.error';
import { FormatError } from '../../errors/format.error';
import { OverflowError } from '../../errors/overflow.error';

export const GENERAL_SHORT_TIMESPAN_FORMAT_SPECIFIER = 'g';
export const GENERAL_LONG_TIMESPAN_FORMAT_SPECIFIER = 'G';

export interface ITimespanArgs {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export class Timespan implements ITimespanArgs {
  private static _dayOnlyFormat = /^\d+$/;
  private static _shortFormat = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  private static _longFormat = /^(\d+[:\.])?([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{1,3})?$/;

  static readonly millisecondsPerSecond = 1000;
  static readonly millisecondsPerMinute = this.millisecondsPerSecond * 60;
  static readonly millisecondsPerHour = this.millisecondsPerMinute * 60;
  static readonly millisecondsPerDay = this.millisecondsPerHour * 24;
  static readonly maxValue = Timespan.fromMilliseconds(Number.MAX_SAFE_INTEGER);
  static readonly minValue = Timespan.fromMilliseconds(Number.MIN_SAFE_INTEGER);
  static readonly zero = Timespan.fromMilliseconds(0);

  private readonly _totalMilliseconds: number = 0;
  private readonly _totalSeconds: number = 0;
  private readonly _totalMinutes: number = 0;
  private readonly _totalHours: number = 0;
  private readonly _totalDays: number = 0;

  private readonly _secondsPerMillisecond = 1 / Timespan.millisecondsPerSecond;
  private readonly _minutesPerMillisecond = 1 / Timespan.millisecondsPerMinute;
  private readonly _hoursPerMillisecond = 1 / Timespan.millisecondsPerHour;
  private readonly _daysPerMillisecond = 1 / Timespan.millisecondsPerDay;

  private readonly _milliseconds: number = 0;
  private readonly _seconds: number = 0;
  private readonly _minutes: number = 0;
  private readonly _hours: number = 0;
  private readonly _days: number = 0;

  get milliseconds() {
    return this._milliseconds;
  }

  get seconds() {
    return this._seconds;
  }

  get minutes() {
    return this._minutes;
  }

  get hours() {
    return this._hours;
  }

  get days() {
    return this._days;
  }

  get totalMilliseconds() {
    return this._totalMilliseconds;
  }

  get totalSeconds() {
    return this._totalSeconds;
  }

  get totalMinutes() {
    return this._totalMinutes;
  }

  get totalHours() {
    return this._totalHours;
  }

  get totalDays() {
    return this._totalDays;
  }

  constructor(args: ITimespanArgs) {
    const { days, hours, minutes, seconds, milliseconds } = args;
    const ms =
      ((days ?? 0) * Timespan.millisecondsPerDay) +
      ((hours ?? 0) * Timespan.millisecondsPerHour) +
      ((minutes ?? 0) * Timespan.millisecondsPerMinute) +
      ((seconds ?? 0) * Timespan.millisecondsPerSecond) +
      (milliseconds ?? 0);

    const tsArgs = Timespan.getTimespanArgs(ms);
    this._days = tsArgs.days;
    this._hours = tsArgs.hours;
    this._minutes = tsArgs.minutes;
    this._seconds = tsArgs.seconds;
    this._milliseconds = tsArgs.milliseconds;

    this._totalMilliseconds = this.getTotalMilliseconds();
    this._totalSeconds = Number((this._totalMilliseconds * this._secondsPerMillisecond).toFixed(5));
    this._totalMinutes = Number((this._totalMilliseconds * this._minutesPerMillisecond).toFixed(5));
    this._totalHours = Number((this._totalMilliseconds * this._hoursPerMillisecond).toFixed(5));
    this._totalDays = Number((this._totalMilliseconds * this._daysPerMillisecond).toFixed(5));

  }

  private static getTimespanArgs(totalMs: number) {
    const days = Math.trunc(totalMs / this.millisecondsPerDay);
    const hours = Math.trunc((totalMs % this.millisecondsPerDay) / this.millisecondsPerHour);
    const minutes = Math.trunc((totalMs % this.millisecondsPerHour) / this.millisecondsPerMinute);
    const seconds = Math.trunc((totalMs % this.millisecondsPerMinute) / this.millisecondsPerSecond);
    const milliseconds = totalMs % this.millisecondsPerSecond;
    return { days, hours, minutes, seconds, milliseconds };
  }

  private static validateParseFormat(value: string) {
    if (this._dayOnlyFormat.test(value)) return;
    if (this._shortFormat.test(value)) return;
    if (this._longFormat.test(value)) return;
    throw new FormatError('timeString invalid format');
  }

  private static validateValueInRange(value: number) {
    if (value < Number.MIN_SAFE_INTEGER) throw new OverflowError('The resulting TimeSpan is less than the minimum value.');
    if (value > Number.MAX_SAFE_INTEGER) throw new OverflowError('The resulting TimeSpan is greater than the maximum value.');
  }

  private static validateValueIsFinite(value: number) {
    if (!Number.isFinite(value) && value > 0) throw new OverflowError('Value is considered positive infinity.');
    if (!Number.isFinite(value) && value < 0) throw new OverflowError('Value is considered negative infinity.');
  }

  private static validateValueIsNumber(value: number) {
    if (Number.isNaN(value)) throw new ArgumentError('Value is equal to NaN.');
  }

  static compare(t1: Timespan, t2: Timespan): number {
    if (t1.totalMilliseconds < t2.totalMilliseconds) return -1;
    if (t1.totalMilliseconds > t2.totalMilliseconds) return 1;
    return 0;
  }

  static equals(t1: Timespan, t2: Timespan): boolean {
    return t1.totalMilliseconds === t2.totalMilliseconds;
  }

  static fromDays(value: number): Timespan {
    if (Number.isNaN(value)) throw new ArgumentError('Value is equal to NaN.');
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    const totalMs = value * Timespan.millisecondsPerDay;

    return this.fromMilliseconds(totalMs);
  }

  static fromHours(value: number): Timespan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return this.fromMilliseconds(value * Timespan.millisecondsPerHour);
  }

  static fromMilliseconds(value: number): Timespan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return new Timespan(this.getTimespanArgs(Math.round(value)));
  }

  static fromMinutes(value: number): Timespan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return this.fromMilliseconds(value * Timespan.millisecondsPerMinute);
  }

  static fromSeconds(value: number): Timespan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return this.fromMilliseconds(value * Timespan.millisecondsPerSecond);
  }

  static parse(timeString: string): Timespan {
    if (isNullOrWhiteSpace(timeString)) throw new ArgumentNullError('timeString is not defined.');
    this.validateParseFormat(timeString);

    const parts = timeString.split(':');

    // format: d
    if (parts.length === 1) {
      return new Timespan({
        days: Number(parts[0])
      });
    }

    // format: hh:mm
    if (parts.length === 2) {
      return new Timespan({
        hours: Number(parts[0]),
        minutes: Number(parts[1])
      });
    }

    // format: d.hh:mm:ss.fff
    if (parts.length === 3) {
      const sms = parts[2].split('.');
      const dh = parts[0].split('.');
      dh.reverse();

      return new Timespan({
        days: Number(dh?.[1] ?? 0),
        hours: Number(dh[0]),
        minutes: Number(parts[1]),
        seconds: Number(sms[0]),
        milliseconds: Number(sms?.[1] ?? 0)
      });
    }

    // format: d:hh:mm:ss.fff
    if (parts.length === 4) {
      const sms = parts[3].split('.');

      return new Timespan({
        days: Number(parts[0]),
        hours: Number(parts[1]),
        minutes: Number(parts[2]),
        seconds: Number(sms[0]),
        milliseconds: Number(sms?.[1] ?? 0)
      });
    }

    throw new Error('Failed to parse timeString');
  }

  static tryParse(s: string): Timespan | undefined {
    try {
      return Timespan.parse(s);
    } catch {
      return undefined;
    }
  }

  private getCustomTimespanFormat(ts: Timespan, format: string): string {
    const isNegative = ts._totalMilliseconds < 0;
    const formattedTime = format
      .replace(/dddddddd/g, ts.days.toString().padStart(8, '0'))
      .replace(/ddddddd/g, ts.days.toString().padStart(7, '0'))
      .replace(/dddddd/g, ts.days.toString().padStart(6, '0'))
      .replace(/ddddd/g, ts.days.toString().padStart(5, '0'))
      .replace(/dddd/g, ts.days.toString().padStart(4, '0'))
      .replace(/ddd/g, ts.days.toString().padStart(3, '0'))
      .replace(/dd/g, ts.days.toString().padStart(2, '0'))
      .replace(/d/g, ts.days.toString())
      .replace(/hh/g, ts.hours.toString().padStart(2, '0'))
      .replace(/h/g, ts.hours.toString())
      .replace(/mm/g, ts.minutes.toString().padStart(2, '0'))
      .replace(/m/g, ts.minutes.toString())
      .replace(/ss/g, ts.seconds.toString().padStart(2, '0'))
      .replace(/s/g, ts.seconds.toString())
      .replace(/fff/g, ts.milliseconds.toString().padEnd(3, '0').substring(0, 3))
      .replace(/ff/g, ts.milliseconds.toString().padEnd(3, '0').substring(0, 2))
      .replace(/f/g, ts.milliseconds.toString().padEnd(3, '0').substring(0, 1));

    return isNegative ? `-${ formattedTime }` : formattedTime;
  }

  private getLongTimespanFormat(ts: Timespan): string {
    let str = '';

    if (ts._totalMilliseconds < 0) str += '-';

    const h = `${ Math.abs(ts.hours) }`.padStart(2, '0');
    const m = `${ Math.abs(ts.minutes) }`.padStart(2, '0');
    const s = `${ Math.abs(ts.seconds) }`.padStart(2, '0');
    const ms = `${ Math.abs(ts.milliseconds) }`.padStart(3, '0');

    str += `${ ts.days }.`;
    str += `${ h }:`;
    str += `${ m }:`;
    str += `${ s }.`;
    str += `${ ms }`;

    return str;
  }

  private getShortTimespanFormat(ts: Timespan): string {
    let str = '';

    if (ts._totalMilliseconds < 0) str += '-';

    const h = `${ ts.hours }`.padStart(2, '0');
    const m = `${ ts.minutes }`.padStart(2, '0');
    const s = `${ ts.seconds }`.padStart(2, '0');
    const ms = `${ ts.milliseconds }`.padStart(3, '0');

    if (ts.days) str += `${ ts.days }.`;
    str += `${ h }:`;
    str += `${ m }:`;
    str += `${ s }`;

    if (ts.milliseconds) str += `.${ ms }`;

    return str;
  }

  private getTotalMilliseconds(): number {
    const d = this._days * Timespan.millisecondsPerDay;
    const h = this._hours * Timespan.millisecondsPerHour;
    const m = this._minutes * Timespan.millisecondsPerMinute;
    const s = this._seconds * Timespan.millisecondsPerSecond;
    const ms = this._milliseconds ?? 0;

    return ms + s + m + h + d;
  }

  add(ts: Timespan): Timespan {
    const ms = this._totalMilliseconds + ts.totalMilliseconds;
    Timespan.validateValueInRange(ms);
    return Timespan.fromMilliseconds(ms);
  }

  compareTo(value: Timespan): number {
    return Timespan.compare(this, value);
  }

  divide(divisor: number): Timespan {
    const ms = this._totalMilliseconds / divisor;
    Timespan.validateValueInRange(ms);
    return Timespan.fromMilliseconds(ms);
  }

  duration(): Timespan {
    return Timespan.fromMilliseconds(Math.abs(this._totalMilliseconds));
  }

  equalsTo(ts: Timespan): boolean {
    return Timespan.equals(this, ts);
  }

  getHashCode(): number {
    return this._totalMilliseconds >> 32;
  }

  multiply(factor: number): Timespan {
    const ms = this._totalMilliseconds * factor;
    Timespan.validateValueInRange(ms);
    return Timespan.fromMilliseconds(ms);
  }

  negate(): Timespan {
    return Timespan.fromMilliseconds(this._totalMilliseconds * -1);
  }

  subtract(ts: Timespan): Timespan {
    const ms = this._totalMilliseconds - ts.totalMilliseconds;
    Timespan.validateValueInRange(ms);
    return Timespan.fromMilliseconds(ms);
  }

  toString(format: string = GENERAL_SHORT_TIMESPAN_FORMAT_SPECIFIER): string {
    if (format === GENERAL_LONG_TIMESPAN_FORMAT_SPECIFIER) return this.getLongTimespanFormat(this);
    if (format === GENERAL_SHORT_TIMESPAN_FORMAT_SPECIFIER) return this.getShortTimespanFormat(this);
    return this.getCustomTimespanFormat(this, format);
  }
}
