import { LogProvider } from '../providers/log.provider.abstract';
import { LogEntry } from '../models/log-entry';
import { LogLevel } from '../models/log-level.enum';

export class MockProvider extends LogProvider {
  clear(): void {
  }

  debug(entry: LogEntry): void {
  }

  error(entry: LogEntry): void {
  }

  fatal(entry: LogEntry): void {
  }

  info(entry: LogEntry): void {
  }

  trace(entry: LogEntry): void {
  }

  warn(entry: LogEntry): void {
  }

  constructor() {
    super({logLevel: LogLevel.Debug});
  }

}
