import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  readonly logs$: Subject<Log> = new Subject();

  debug(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Debug, optionalParams));
  }

  error(error: Error): void;
  error(message: string): void;
  error(arg: string | Error): void {
    this.logs$.next(new Log(arg, LogLevel.Error));

  }

  fatal(error: Error): void;
  fatal(message: string): void;
  fatal(arg: string | Error): void {
    this.logs$.next(new Log(arg, LogLevel.Fatal));
  }

  info(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Info, optionalParams));
  }

  trace(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Trace, optionalParams));
  }

  warn(message: string, ...optionalParams: any[]): void {
    this.logs$.next(new Log(message, LogLevel.Warn, optionalParams));
  }

}
