import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  readonly logs$: Subject<Log> = new Subject();

  trace(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Trace, optionalParams));
  }

  debug(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Debug, optionalParams));
  }

  info(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Info, optionalParams));
  }

  warn(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Warn, optionalParams));
  }

  error(arg: string | Error, ...optionalParams: any[]): void {
    const message = arg instanceof Error ? arg.message : arg;
    this.logs$.next(new Log(message, LogLevel.Trace, optionalParams));
  }

  fatal(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Fatal, optionalParams));
  }

}
