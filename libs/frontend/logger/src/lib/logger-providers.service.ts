import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { LogProvider } from './abstractions/abstract-log-provider';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level.enum';
import { LoggerService } from './logger.service';

class LogStream {
  logs$!: Observable<Log>;

  private shouldLog(requested: LogLevel) {
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
    })
  }

}

@Injectable({ providedIn: 'root' })
export class LoggerProvidersService {

  private _providers: Map<string, LogProvider> = new Map();

  constructor(
    private _logger: LoggerService
  ) { }

  private subscribeProvider(provider: LogProvider): void {
    Object.assign(provider, new LogStream());
    (provider as LogProvider & LogStream).logs$ = this._logger.logs$;
    (provider as LogProvider & LogStream).subscribe();
  }

  set(providerName: string, provider: LogProvider): LogProvider {
    this.subscribeProvider(provider);
    this._providers.set(providerName, provider);
    return provider;
  }

  get(): LogProvider[];
  get(providerName: string): LogProvider | undefined;
  get(providerName?: string): (LogProvider | undefined) | LogProvider[] {
    if (providerName) return this._providers.get(providerName);
    return Array.from(this._providers.values());
  }

}
