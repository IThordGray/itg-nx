// tslint:disable:no-console

import { LogEntry } from '../models/log-entry';
import { ILogProviderConfig } from '../models/log-provider-config';
import { LogProvider } from '../models/abstract.log.provider';
import { LogLevel } from '@itg/logger/abstractions';

export class ConsoleLogProvider extends LogProvider {
  constructor(config: ILogProviderConfig = { logLevel: LogLevel.Trace }) {
    super(config);
  }

  public clear(): void {
    console.clear();
  }

  public debug(entry: LogEntry): void {
    console.log(entry.toString());
  }

  public error(entry: LogEntry): void {
    console.error(entry.toString());
  }

  public fatal(entry: LogEntry): void {
    console.error(entry.toString());
  }

  public info(entry: LogEntry): void {
    console.info(entry.toString());
  }

  public trace(entry: LogEntry): void {
    console.trace(entry.toString());
  }

  public warn(entry: LogEntry): void {
    console.warn(entry.toString());
  }
}
