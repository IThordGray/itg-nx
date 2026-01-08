import { LogLevel } from './log-level';

export type LogFormatter = (log: Log) => string;

export class Log {
  date = new Date();

  constructor(
    public message: string | Error,
    public level: LogLevel,
    public optionalParams?: any[]
  ) {
  }

  toString(formatter?: LogFormatter): string {
    if (formatter) return formatter(this);

    let messageStr: string;

    if (this.message instanceof Error) {
      messageStr = this.message.message;
    } else {
      messageStr = this.message;
    }

    return `${ LogLevel[this.level] }: ${ messageStr } ${ !!this.optionalParams?.length ? JSON.stringify(this.optionalParams) : '' }`.trim();
  }

}
