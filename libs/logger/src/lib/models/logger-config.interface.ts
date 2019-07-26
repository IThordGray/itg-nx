import { Type } from '@angular/core';
import { LogProvider } from './abstract.log.provider';
import { ILogProviderConfig } from './log-provider-config';

export interface ILoggerConfig {
  providers?: {
    provider: Type<LogProvider>;
    config?: ILogProviderConfig;
  }[];
}
