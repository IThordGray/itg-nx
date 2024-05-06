import { Provider } from '@angular/core';
import { ConfigService } from './config.service';

export function provideConfigService(defaultConfig?: Record<string, any>): Provider {
  return {
    provide: ConfigService,
    useFactory: () => new ConfigService(defaultConfig)
  };
}
