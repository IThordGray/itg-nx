import { CommonModule } from '@angular/common';
import { Inject, NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ConfigModule, ConfigService, IConfigConfig } from '@itg/config';
import { ConsoleLogProvider, LoggerModule, LoggerService, LogLevel } from '@itg/logger';
import { createProxy, throwIfAlreadyLoaded } from 'libs/common';
import { LoggerProvidersService } from 'libs/logger/src/lib/services/logger-providers.service';
import { ENVIRONMENT_TOKEN } from './tokens/environment.token';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withValue({}),
    LoggerModule
  ]
})
export class BootstrapModule {

  public static withOptions(options: { environment: { [key: string]: any } }): ModuleWithProviders {
    return {
      ngModule: BootstrapModule,
      providers: [
        { provide: ENVIRONMENT_TOKEN, useValue: options.environment }
      ]
    }
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: BootstrapModule,

    @Inject(ENVIRONMENT_TOKEN) environment: IConfigConfig,
    config: ConfigService,
    logger: LoggerService,
    loggerProviders: LoggerProvidersService
  ) {
    throwIfAlreadyLoaded(parentModule, 'BootstrapModule');

    config.set('logLevel', environment.production ? LogLevel.Error : LogLevel.Debug);

    const consoleLogProvider: ConsoleLogProvider = new ConsoleLogProvider();
    createProxy(config.get(), 'logLevel', consoleLogProvider.config, 'logLevel')

    loggerProviders.register(consoleLogProvider);

    logger.debug('Logger instantiated successfully.');
  }
}

