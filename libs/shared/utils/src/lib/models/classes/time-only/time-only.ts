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
import { TimeSpan } from '../time-span/time-span';

export interface ITimeOnlyArgs {
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

@StaticImplements<IParsableStatic<TimeOnly>>()
@StaticImplements<IComparableStatic<TimeOnly>>()
@StaticImplements<IEquatableStatic<TimeOnly>>()
export class TimeOnly implements IComparable<TimeOnly>, IEquatable<TimeOnly>, IFormattable {
  private static _shortFormat = /^([01]?\d|2[0-3]):([0-5]\d)$/;
  private static _longFormat = /^([01]?\d|2[0-3]):([0-5]\d):([0-5]\d)(\.\d{1,3})?$/;

  static readonly millisecondsPerSecond = 1000;
  static readonly millisecondsPerMinute = TimeOnly.millisecondsPerSecond * 60;
  static readonly millisecondsPerHour = TimeOnly.millisecondsPerMinute * 60;
  static readonly millisecondsPerDay = TimeOnly.millisecondsPerHour * 24;
  static readonly maxValue = TimeOnly.fromMilliseconds(TimeOnly.millisecondsPerDay - 1);
  static readonly minValue = TimeOnly.fromMilliseconds(0);

  private readonly _secondsPerMillisecond = 1 / TimeOnly.millisecondsPerSecond;
  private readonly _minutesPerMillisecond = 1 / TimeOnly.millisecondsPerMinute;
  private readonly _hoursPerMillisecond = 1 / TimeOnly.millisecondsPerHour;
  private readonly _totalMilliseconds: number = 0;
  private readonly _totalSeconds: number = 0;
  private readonly _totalMinutes: number = 0;
  private readonly _totalHours: number = 0;

  private readonly _date: Date;

  get hour(): number {
    return this._date.getHours();
  }

  get minute(): number {
    return this._date.getMinutes();
  }

  get second(): number {
    return this._date.getSeconds();
  }

  get millisecond(): number {
    return this._date.getMilliseconds();
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

  constructor(args: ITimeOnlyArgs) {
    this._date = new Date();

    const { hours, minutes, seconds, milliseconds } = args;
    this._date.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0, milliseconds ?? 0);
    this._date.setFullYear(1970, 0, 1); // Set date to Unix epoch date for consistency

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    this._totalMilliseconds = this._date.getTime() - startOfDay.getTime();
    this._totalSeconds = Number((this._totalMilliseconds * this._secondsPerMillisecond).toFixed(5));
    this._totalMinutes = Number((this._totalMilliseconds * this._minutesPerMillisecond).toFixed(5));
    this._totalHours = Number((this._totalMilliseconds * this._hoursPerMillisecond).toFixed(5));
  }

  private static getTimeOnlyArgs(totalMs: number) {
    const hours = Math.trunc((totalMs % this.millisecondsPerDay) / this.millisecondsPerHour);
    const minutes = Math.trunc((totalMs % this.millisecondsPerHour) / this.millisecondsPerMinute);
    const seconds = Math.trunc((totalMs % this.millisecondsPerMinute) / this.millisecondsPerSecond);
    const milliseconds = totalMs % this.millisecondsPerSecond;
    return { hours, minutes, seconds, milliseconds };
  }

  private static validateHoursInRange(value: number) {
    this.validateMinValue(value);
    this.validateMillisecondsInRange(value * TimeOnly.millisecondsPerHour);
  }

  private static validateMillisecondsInRange(value: number) {
    this.validateMinValue(value);
    if (value >= this.millisecondsPerDay) throw new OverflowError('The resulting TimeOnly cannot be more than the maximum value.');
  }

  private static validateMinValue(value: number) {
    if (value < 0) throw new OverflowError('The resulting TimeOnly cannot be less than the minimum value.');
  }

  private static validateMinutesInRange(value: number) {
    this.validateMinValue(value);
    this.validateMillisecondsInRange(value * TimeOnly.millisecondsPerMinute);
  }

  private static validateParseFormat(value: string) {
    if (this._shortFormat.test(value)) return;
    if (this._longFormat.test(value)) return;
    throw new FormatError('timeString invalid format');
  }

  private static validateSecondsInRange(value: number) {
    this.validateMinValue(value);
    this.validateMillisecondsInRange(value * TimeOnly.millisecondsPerSecond);
  }

  private static validateValueIsFinite(value: number) {
    if (!Number.isFinite(value) && value > 0) throw new OverflowError('Value is considered positive infinity.');
    if (!Number.isFinite(value) && value < 0) throw new OverflowError('Value is considered negative infinity.');
  }

  private static validateValueIsNumber(value: number) {
    if (Number.isNaN(value)) throw new ArgumentError('Value is equal to NaN.');
  }

  static compare(t1: TimeOnly, t2: TimeOnly) {
    if (t1.totalMilliseconds < t2.totalMilliseconds) return -1;
    if (t1.totalMilliseconds > t2.totalMilliseconds) return 1;
    return 0;
  }

  static equals(t1: TimeOnly, t2: TimeOnly): boolean {
    return t1.totalMilliseconds === t2.totalMilliseconds;
  }

  static fromDateTime(date: Date): TimeOnly {
    const args = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds()
    };

    return new TimeOnly(args);
  }

  static fromHours(value: number): TimeOnly {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateHoursInRange(value);

    return this.fromMilliseconds(value * TimeOnly.millisecondsPerHour);
  }

  static fromMilliseconds(value: number): TimeOnly {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateMillisecondsInRange(value);

    return new TimeOnly(this.getTimeOnlyArgs(Math.round(value)));
  }

  static fromMinutes(value: number): TimeOnly {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateMinutesInRange(value);

    return this.fromMilliseconds(value * TimeOnly.millisecondsPerMinute);
  }

  static fromSeconds(value: number): TimeOnly {
    this.validateValueIsNumber(value);
    this.validateValueIsFinite(value);
    this.validateSecondsInRange(value);

    return this.fromMilliseconds(value * TimeOnly.millisecondsPerSecond);
  }

  static parse(timeString: string): TimeOnly {
    if (isNullOrWhiteSpace(timeString)) throw new ArgumentNullError('timeString is not defined.');
    this.validateParseFormat(timeString);

    const parts = timeString.split(':');

    // format: hh:mm
    if (parts.length === 2) {
      return new TimeOnly({
        hours: Number(parts[0]),
        minutes: Number(parts[1])
      });
    }

    // format: hh:mm:ss.fff
    if (parts.length === 3) {
      const sms = parts[2].split('.');

      return new TimeOnly({
        hours: Number(parts[0]),
        minutes: Number(parts[1]),
        seconds: Number(sms[0]),
        milliseconds: Number(sms[1] ?? 0)
      });
    }

    throw new Error('Failed to parse timeString');
  }

  static tryParse(timeString: string): TimeOnly | undefined {
    try {
      return TimeOnly.parse(timeString);
    } catch {
      return undefined;
    }
  }

  add(ts: TimeSpan): TimeOnly {
    const newDate = new Date(this._date.getTime());

    newDate.setDate(newDate.getDate() + ts.days);
    newDate.setHours(newDate.getHours() + ts.hours);
    newDate.setMinutes(newDate.getMinutes() + ts.minutes);
    newDate.setSeconds(newDate.getSeconds() + ts.seconds);
    newDate.setMilliseconds(newDate.getMilliseconds() + ts.milliseconds);
    return TimeOnly.fromDateTime(newDate);
  }

  addHours(hours: number): TimeOnly {
    const newDate = new Date(this._date);
    newDate.setHours(this._date.getHours() + hours);
    return TimeOnly.fromDateTime(newDate);
  }

  addMinutes(minutes: number): TimeOnly {
    const newDate = new Date(this._date);
    newDate.setMinutes(this._date.getMinutes() + minutes);
    return TimeOnly.fromDateTime(newDate);
  }

  compareTo(t: TimeOnly): -1 | 1 | 0 {
    return TimeOnly.compare(this, t);
  }

  equals(t: TimeOnly): boolean {
    return TimeOnly.equals(this, t);
  }

  isBetween(t1: TimeOnly, t2: TimeOnly): boolean {
    return (
      this.totalMilliseconds >= t1.totalMilliseconds &&
      this.totalMilliseconds < t2.totalMilliseconds
    );
  }

  subtract(ts: TimeSpan): TimeOnly {
    const newDate = new Date(this._date.getTime());

    newDate.setDate(newDate.getDate() - ts.days);
    newDate.setHours(newDate.getHours() - ts.hours);
    newDate.setMinutes(newDate.getMinutes() - ts.minutes);
    newDate.setSeconds(newDate.getSeconds() - ts.seconds);
    newDate.setMilliseconds(newDate.getMilliseconds() - ts.milliseconds);
    return TimeOnly.fromDateTime(newDate);
  }

  toDate(): Date {
    return this._date;
  }

  toString(): string {
    return this._date.toTimeString().split(' ')[0];
  }
}