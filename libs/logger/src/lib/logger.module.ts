import { InjectionToken, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { ILogProviderConfig } from './models/log-provider-config';
import { ILoggerConfig } from './models/logger-config.interface';
import { LogProvider } from './providers/log.provider.abstract';
import { LoggerService } from './services/logger.service';

export const LOG_CONFIG_TOKEN = new InjectionToken<ILoggerConfig>('Log config token');

function createProvider<T extends LogProvider>(provider: Type<T>, cfg: ILogProviderConfig): T {
  return new provider(cfg);
}

export function getLoggerService(cfg: ILoggerConfig): LoggerService {

  cfg.providers = cfg.providers || [];

  const providers: LogProvider[] = cfg.providers.map(x => createProvider(x.provider, x.config));
  return new LoggerService(providers);

}

@NgModule()
export class LoggerModule {
  public static withConfig(cfg: ILoggerConfig = {}): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        {
          provide: LOG_CONFIG_TOKEN,
          useValue: cfg
        },
        {
          provide: LoggerService,
          useFactory: getLoggerService,
          deps: [LOG_CONFIG_TOKEN]
        }
      ]
    };
  }
}
