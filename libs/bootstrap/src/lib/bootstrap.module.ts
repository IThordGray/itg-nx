import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ConfigModule } from '@itg/config';
import { ConsoleLogProvider, LoggerModule, LogLevel, LoggerService } from '@itg/logger';
import { environment } from 'apps/digitwin-simulator/src/environments/environment';
import { LoggerProvidersService } from 'libs/logger/src/lib/services/logger-providers.service';
import { throwIfAlreadyLoaded } from 'libs/common';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withValue({}),
    LoggerModule
  ]
})
export class BootstrapModule {

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: BootstrapModule,

    logger: LoggerService,
    loggerProviders: LoggerProvidersService
  ) {
    throwIfAlreadyLoaded(parentModule, 'BootstrapModule');

    const consoleLogProvider = new ConsoleLogProvider();
    consoleLogProvider.config.logLevel = environment.production ? LogLevel.Error : LogLevel.Debug;
    loggerProviders.register(consoleLogProvider);

    logger.debug('Logger instantiated successfully.');
  }
}

