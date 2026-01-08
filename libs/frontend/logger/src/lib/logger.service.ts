import { inject, Injectable, Provider } from '@angular/core';
import { Subject } from 'rxjs';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level';
import { LogProvider } from './abstractions/log-provider';
import { LOG_PROVIDERS } from './abstractions/log-providers.injection-token';
import { LogStream } from './log-stream';

export function provideLogger(providers: LogProvider[]): Provider {
  return [
    { provide: LOG_PROVIDERS, useValue: providers, multi: true },
  ];
}

@Injectable({ providedIn: 'root' })
export class LoggerService {

  private readonly _providers = inject(LOG_PROVIDERS);
  private readonly _logs$: Subject<Log> = new Subject();

  constructor() {
    // Mixin LogStream into each provider in order to subscribe to the _logs$ stream, without needing to have it
    // as part of the LogProvider interface.
    this._providers.forEach(provider => {
      const stream = new LogStream();

      (provider as LogProvider & LogStream).logs$ = this._logs$;
      (provider as LogProvider & LogStream).shouldLog = stream.shouldLog;
      (provider as LogProvider & LogStream).subscribe = stream.subscribe;

      (provider as LogProvider & LogStream).subscribe();
    });
  }

  debug(message: string, ...optionalParams: any[]): void {
    this._logs$.next(new Log(message, LogLevel.Debug, optionalParams));
  }

  error(error: Error): void;
  error(message: string): void;
  error(arg: string | Error): void {
    this._logs$.next(new Log(arg, LogLevel.Error));
  }

  fatal(error: Error): void;
  fatal(message: string): void;
  fatal(arg: string | Error): void {
    this._logs$.next(new Log(arg, LogLevel.Fatal));
  }

  info(message: string, ...optionalParams: any[]): void {
    this._logs$.next(new Log(message, LogLevel.Info, optionalParams));
  }

  trace(message: string, ...optionalParams: any[]): void {
    this._logs$.next(new Log(message, LogLevel.Trace, optionalParams));
  }

  warn(message: string, ...optionalParams: any[]): void {
    this._logs$.next(new Log(message, LogLevel.Warn, optionalParams));
  }

}
