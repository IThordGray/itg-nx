import { Inject, NgModule } from '@angular/core';
import { ILogProviderConfig } from './abstractions/abstract-log-provider';
import { LoggerProvidersService } from './logger-providers.service';
import { DEFAULT_PROVIDER_CONFIG, DefaultProvider } from './providers/default.provider';

@NgModule()
export class LoggerModule {
  constructor(
    _provider: LoggerProvidersService,
    @Inject(DEFAULT_PROVIDER_CONFIG) defaultProviderConfig: ILogProviderConfig
  ) {

    _provider.set('console', new DefaultProvider(defaultProviderConfig))
  }
}
