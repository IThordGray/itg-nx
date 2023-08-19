import { InjectionToken } from '@angular/core';
import { LogProvider } from './log-provider';

export const LOG_PROVIDERS = new InjectionToken<LogProvider[]>('LOG_PROVIDERS', { factory: () => [] });