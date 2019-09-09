import { isNullOrWhiteSpace } from '@itg/common';
import { LogLevel } from './log-level.enum';

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

  private getEntryDateAsString(): string {
    return this.entryDate.getDay().toString() + '/' +
      this.entryDate.getMonth().toString() + '/' +
      this.entryDate.getFullYear().toString() +
      ' ' +
      this.entryDate.getHours().toString() + ':' +
      this.entryDate.getMinutes().toString() + ':' +
      this.entryDate.getSeconds().toString();
  }

  public toString(): string {
    const date: string = this.getEntryDateAsString();

    const type: string = `${LogLevel[this.logLevel]}`;

    const paramString: string = this.formatParams(this.optionalParams);

    const msg: string = this.message +
      (!isNullOrWhiteSpace(paramString) ? ` ${paramString}` : '');

    return `${date} [${type}] - ${msg}`;
  }
}
