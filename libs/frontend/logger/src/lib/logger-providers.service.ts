import { inject, Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level';
import { LogProvider } from './abstractions/log-provider';
import { LOG_PROVIDERS } from './abstractions/log-providers.injection-token';
import { LoggerService } from './logger.service';

class LogStream {
  logs$!: Observable<Log>;

  shouldLog(requested: LogLevel): boolean {
    if ((this as unknown as LogProvider).providerConfig.logLevel === LogLevel.Trace) return true;

    return !(
      requested === LogLevel.Off ||
      requested < (this as unknown as LogProvider).providerConfig.logLevel
    );
  }

  subscribe(): void {
    this.logs$.pipe(
      filter(log => this.shouldLog(log.level))
    ).subscribe(log => {
      if (log.level === LogLevel.Trace) return (this as unknown as LogProvider).trace(log);
      if (log.level === LogLevel.Debug) return (this as unknown as LogProvider).debug(log);
      if (log.level === LogLevel.Info) return (this as unknown as LogProvider).info(log);
      if (log.level === LogLevel.Warn) return (this as unknown as LogProvider).warn(log);
      if (log.level === LogLevel.Error) return (this as unknown as LogProvider).error(log);
      if (log.level === LogLevel.Fatal) return (this as unknown as LogProvider).fatal(log);
    });
  }
}

@Injectable({ providedIn: 'root' })
export class LoggerProvidersService {
  private readonly _logger = inject(LoggerService);
  private readonly _providers = inject(LOG_PROVIDERS);

  subscribeToProviders(): void {
    this._providers.forEach(provider => {
      const stream = new LogStream();

      (provider as LogProvider & LogStream).logs$ = this._logger.logs$;
      (provider as LogProvider & LogStream).shouldLog = stream.shouldLog;
      (provider as LogProvider & LogStream).subscribe = stream.subscribe;

      (provider as LogProvider & LogStream).subscribe();
    });
  }
}