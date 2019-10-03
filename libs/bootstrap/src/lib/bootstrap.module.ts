import { CommonModule } from '@angular/common';
import {
  Inject,
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from '@angular/core';
import { ConfigModule, ConfigService, IConfigConfig } from '@itg/config';
import { createProxy, throwIfAlreadyLoaded } from 'libs/common';
import { ENVIRONMENT_TOKEN } from './tokens/environment.token';
import { LogLevel } from '@itg/logger/abstractions';

import {
  LoggerModule,
  LoggerService,
  LoggerProvidersService
} from '@itg/logger/service';
import {
  ConsoleLogProvider,
  ConsoleRemoteLogProvider
} from '@itg/logger/providers';

@NgModule({
  imports: [CommonModule, ConfigModule.withValue({}), LoggerModule]
})
export class BootstrapModule {
  public static withOptions(options: {
    environment: { [key: string]: any };
  }): ModuleWithProviders {
    return {
      ngModule: BootstrapModule,
      providers: [{ provide: ENVIRONMENT_TOKEN, useValue: options.environment }]
    };
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

    config.set(
      'logLevel',
      environment.production ? LogLevel.Error : LogLevel.Debug
    );
    config.set(
      'consoleRemoteChannelName',
      environment.consoleRemoteLogger
        ? environment.consoleRemoteLogger
        : 'default-channel-name'
    );

    const consoleLogProvider: ConsoleLogProvider = new ConsoleLogProvider();
    const consoleRemoteLogProvider: ConsoleRemoteLogProvider = new ConsoleRemoteLogProvider(
      { channelName: config.get('consoleRemoteChannelName').channelName }
    );
    createProxy(
      config.get(),
      'logLevel',
      consoleLogProvider.config,
      'logLevel'
    );

    loggerProviders.register(consoleLogProvider);
    loggerProviders.register(consoleRemoteLogProvider);

    logger.debug('Logger instantiated successfully.');
  }
}
