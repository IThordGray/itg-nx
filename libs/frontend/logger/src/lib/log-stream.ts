import { filter, Observable } from 'rxjs';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level';
import { LogProvider } from './abstractions/log-provider';

export class LogStream {
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
