import { Type } from '@angular/core';
import { LogProvider } from '../providers/log.provider.abstract';
import { ILogProviderConfig } from './log-provider-config';

export interface ILoggerConfig {
  providers?: {
    provider: Type<LogProvider>;
    config?: ILogProviderConfig;
  }[];
}
