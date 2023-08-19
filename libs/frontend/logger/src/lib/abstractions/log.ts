import { LogLevel } from './log-level';

export class Log {
  date = new Date();

  constructor(
    public message: string | Error,
    public level: LogLevel,
    public optionalParams?: any[]
  ) {
  }

  toString(/* Formatter */): string {
    return `${ LogLevel[this.level] } ${ this.message }`;
  }

}
