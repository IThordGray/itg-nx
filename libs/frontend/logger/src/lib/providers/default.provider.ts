import { InjectionToken } from '@angular/core';
import { ILogProviderConfig, LogProvider } from '../abstractions/abstract-log-provider';
import { Log } from '../abstractions/log';
import { LogLevel } from '../abstractions/log-level.enum';

export const DEFAULT_PROVIDER_CONFIG = new InjectionToken<ILogProviderConfig>('Default log provider config', {
  factory: () => ({ logLevel: LogLevel.Trace })
});

/* eslint-disable */
export class DefaultProvider extends LogProvider {

  debug(log: Log): void {
    console.debug(log.toString());
  }

  error(log: Log): void {
    console.error(log.toString());
  }

  fatal(log: Log): void {
    console.error(log.toString());
  }

  info(log: Log): void {
    console.info(log.toString());
  }

  trace(log: Log): void {
    console.trace(log.toString());
  }

  warn(log: Log): void {
    console.warn(log.toString());
  }

}
