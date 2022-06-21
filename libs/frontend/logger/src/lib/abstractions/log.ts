import { LogLevel } from './log-level.enum';

export class Log {
  date = new Date();

  constructor(
    public message: string,
    public level: LogLevel,
    public optionalParams: any[]
  ) { }

  toString(/* Formatter */): string {
      return `${ LogLevel[this.level] } ${ this.message }`;
  }

}
