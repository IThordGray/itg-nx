import { LogLevel } from './log-level.enum';
import { isNullOrWhitespace } from './utils/utils';

export class LogEntry {
  public entryDate: Date = new Date();
  public message: string = '';
  public logLevel: LogLevel = LogLevel.Trace;
  public optionalParams: any[] = [];

  private formatParams(params: any[]): string {
    if (!params) {
      return '';
    }

    let ret: string = '';

    params.forEach(param => {

      if (typeof param === 'object') {
        ret += JSON.stringify(param);
        return;
      }

      ret += param;
      return;
    });

    return ret;
  }

  public toString(): string {
    const date: string = `${this.entryDate}`;
    const type: string = `${LogLevel[this.logLevel]}`;

    const paramString: string = this.formatParams(this.optionalParams);

    const msg: string = this.message +
      (!isNullOrWhitespace(paramString) ? ` ${paramString}` : '');

    return `${date}: ${type} - ${msg}`;
  }
}
