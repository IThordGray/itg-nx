import { isNullOrWhiteSpace } from '../../../helpers/is-null-or-whitespace.helper';
import { StaticImplements } from '../../../helpers/static-implements.helper';
import { ArgumentNullError } from '../../errors/argument-null.error';
import { ArgumentError } from '../../errors/argument.error';
import { FormatError } from '../../errors/format.error';
import { OverflowError } from '../../errors/overflow.error';
import { IComparable, IComparableStatic } from '../../interfaces/comparable.interface';
import { IEquatable, IEquatableStatic } from '../../interfaces/equatable.interface';
import { IFormattable } from '../../interfaces/formattable.interface';
import { IParsableStatic } from '../../interfaces/parsable.interface';

export const GENERAL_SHORT_TIMESPAN_FORMAT_SPECIFIER = 'g';
export const GENERAL_LONG_TIMESPAN_FORMAT_SPECIFIER = 'G';

export interface ITimespanArgs {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

@StaticImplements<IParsableStatic<TimeSpan>>()
@StaticImplements<IComparableStatic<TimeSpan>>()
@StaticImplements<IEquatableStatic<TimeSpan>>()
export class TimeSpan implements IComparable<TimeSpan>, IEquatable, IFormattable {
  private static _dayOnlyFormat = /^-?\d+$/;
  private static _shortFormat = /^-?([01]?\d|2[0-3]):([0-5]\d)(\.\d+)?$/;
  private static _longFormat = /^-?(\d+[:\.])?([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d+)?$/;

  static readonly millisecondsPerSecond = 1000;
  static readonly millisecondsPerMinute = TimeSpan.millisecondsPerSecond * 60;
  static readonly millisecondsPerHour = TimeSpan.millisecondsPerMinute * 60;
  static readonly millisecondsPerDay = TimeSpan.millisecondsPerHour * 24;

  static readonly maxValue = TimeSpan.fromMilliseconds(Number.MAX_SAFE_INTEGER);
  static readonly minValue = TimeSpan.fromMilliseconds(Number.MIN_SAFE_INTEGER);
  static readonly zero = TimeSpan.fromMilliseconds(0);

  private readonly _totalMilliseconds: number = 0;
  private readonly _totalSeconds: number = 0;
  private readonly _totalMinutes: number = 0;
  private readonly _totalHours: number = 0;
  private readonly _totalDays: number = 0;

  private readonly _secondsPerMillisecond = 1 / TimeSpan.millisecondsPerSecond;
  private readonly _minutesPerMillisecond = 1 / TimeSpan.millisecondsPerMinute;
  private readonly _hoursPerMillisecond = 1 / TimeSpan.millisecondsPerHour;
  private readonly _daysPerMillisecond = 1 / TimeSpan.millisecondsPerDay;

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
      ((days ?? 0) * TimeSpan.millisecondsPerDay) +
      ((hours ?? 0) * TimeSpan.millisecondsPerHour) +
      ((minutes ?? 0) * TimeSpan.millisecondsPerMinute) +
      ((seconds ?? 0) * TimeSpan.millisecondsPerSecond) +
      (milliseconds ?? 0);

    const tsArgs = TimeSpan.getTimespanArgs(ms);
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

  static compare(t1: TimeSpan, t2: TimeSpan): -1 | 0 | 1 {
    if (t1.totalMilliseconds < t2.totalMilliseconds) return -1;
    if (t1.totalMilliseconds > t2.totalMilliseconds) return 1;
    return 0;
  }

  static equals(t1: TimeSpan, t2: TimeSpan): boolean {
    return t1.totalMilliseconds === t2.totalMilliseconds;
  }

  static fromDays(value: number): TimeSpan {
    if (Number.isNaN(value)) throw new ArgumentError('Value is equal to NaN.');
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    const totalMs = value * TimeSpan.millisecondsPerDay;

    return this.fromMilliseconds(totalMs);
  }

  static fromHours(value: number): TimeSpan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return this.fromMilliseconds(value * TimeSpan.millisecondsPerHour);
  }

  static fromMilliseconds(value: number): TimeSpan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return new TimeSpan(this.getTimespanArgs(Math.round(value)));
  }

  static fromMinutes(value: number): TimeSpan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return this.fromMilliseconds(value * TimeSpan.millisecondsPerMinute);
  }

  static fromSeconds(value: number): TimeSpan {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateValueInRange(value);

    return this.fromMilliseconds(value * TimeSpan.millisecondsPerSecond);
  }

  private static convertFractionalSecondsToMilliseconds(fractionalPart: string): number {
    if (!fractionalPart || fractionalPart.length === 0) return 0;
    // Convert fractional seconds (e.g., "3643211" = 0.3643211 seconds) to milliseconds
    const fractionalSeconds = Number('0.' + fractionalPart);
    return Math.round(fractionalSeconds * TimeSpan.millisecondsPerSecond);
  }

  static parse(timeString: string): TimeSpan {
    if (isNullOrWhiteSpace(timeString)) throw new ArgumentNullError('timeString is not defined.');
    this.validateParseFormat(timeString);

    const isNegative = timeString.startsWith('-');
    const normalizedString = isNegative ? timeString.substring(1) : timeString;
    const parts = normalizedString.split(':');

    // format: d
    if (parts.length === 1) {
      const result = new TimeSpan({
        days: Number(parts[0])
      });
      return isNegative ? result.negate() : result;
    }

    // format: hh:mm
    if (parts.length === 2) {
      const result = new TimeSpan({
        hours: Number(parts[0]),
        minutes: Number(parts[1])
      });
      return isNegative ? result.negate() : result;
    }

    // format: d.hh:mm:ss.fff
    if (parts.length === 3) {
      const sms = parts[2].split('.');
      const dh = parts[0].split('.');
      dh.reverse();

      const result = new TimeSpan({
        days: Number(dh?.[1] ?? 0),
        hours: Number(dh[0]),
        minutes: Number(parts[1]),
        seconds: Number(sms[0]),
        milliseconds: this.convertFractionalSecondsToMilliseconds(sms?.[1] ?? '')
      });
      return isNegative ? result.negate() : result;
    }

    // format: d:hh:mm:ss.fff
    if (parts.length === 4) {
      const sms = parts[3].split('.');

      const result = new TimeSpan({
        days: Number(parts[0]),
        hours: Number(parts[1]),
        minutes: Number(parts[2]),
        seconds: Number(sms[0]),
        milliseconds: this.convertFractionalSecondsToMilliseconds(sms?.[1] ?? '')
      });
      return isNegative ? result.negate() : result;
    }

    throw new Error('Failed to parse timeString');
  }

  static tryParse(s: string): TimeSpan | undefined {
    try {
      return TimeSpan.parse(s);
    } catch {
      return undefined;
    }
  }

  private getCustomTimespanFormat(ts: TimeSpan, format: string): string {
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

  private getLongTimespanFormat(ts: TimeSpan): string {
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

  private getShortTimespanFormat(ts: TimeSpan): string {
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
    const d = this._days * TimeSpan.millisecondsPerDay;
    const h = this._hours * TimeSpan.millisecondsPerHour;
    const m = this._minutes * TimeSpan.millisecondsPerMinute;
    const s = this._seconds * TimeSpan.millisecondsPerSecond;
    const ms = this._milliseconds ?? 0;

    return ms + s + m + h + d;
  }

  add(ts: TimeSpan): TimeSpan {
    const ms = this._totalMilliseconds + ts.totalMilliseconds;
    TimeSpan.validateValueInRange(ms);
    return TimeSpan.fromMilliseconds(ms);
  }

  compareTo(value: TimeSpan): -1 | 0 | 1 {
    return TimeSpan.compare(this, value);
  }

  divide(divisor: number): TimeSpan {
    const ms = this._totalMilliseconds / divisor;
    TimeSpan.validateValueInRange(ms);
    return TimeSpan.fromMilliseconds(ms);
  }

  duration(): TimeSpan {
    return TimeSpan.fromMilliseconds(Math.abs(this._totalMilliseconds));
  }

  equals(ts: TimeSpan): boolean {
    return TimeSpan.equals(this, ts);
  }

  getHashCode(): number {
    return this._totalMilliseconds >> 32;
  }

  multiply(factor: number): TimeSpan {
    const ms = this._totalMilliseconds * factor;
    TimeSpan.validateValueInRange(ms);
    return TimeSpan.fromMilliseconds(ms);
  }

  negate(): TimeSpan {
    return TimeSpan.fromMilliseconds(this._totalMilliseconds * -1);
  }

  subtract(ts: TimeSpan): TimeSpan {
    const ms = this._totalMilliseconds - ts.totalMilliseconds;
    TimeSpan.validateValueInRange(ms);
    return TimeSpan.fromMilliseconds(ms);
  }

  toString(format: string = GENERAL_SHORT_TIMESPAN_FORMAT_SPECIFIER): string {
    if (format === GENERAL_LONG_TIMESPAN_FORMAT_SPECIFIER) return this.getLongTimespanFormat(this);
    if (format === GENERAL_SHORT_TIMESPAN_FORMAT_SPECIFIER) return this.getShortTimespanFormat(this);
    return this.getCustomTimespanFormat(this, format);
  }
}
