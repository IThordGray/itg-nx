import { NgModule } from '@angular/core';
import { ConfigModule, ConfigService } from '@itg/config';
import { LoggerModule, LogLevel } from '@itg/logger';

@NgModule({
  imports: [
    ConfigModule.withValue({
      logLevel: LogLevel.Trace
    }),
    LoggerModule
  ]
})
export class BootstrapModule {

  constructor(
    config: ConfigService
    // logger: LoggerService
  ) {

    // Used to adjust the logger.
    // const consoleLogger: ConsoleLogProvider = logger.get<ConsoleLogProvider>(ConsoleLogProvider);
    //
    // Object.defineProperty(consoleLogger.config, 'logLevel', {
    //   get: () => {
    //     return config.get('logLevel');
    //   },
    //   set: v => {
    //     config.set('logLevel', v);
    //   },
    //   enumerable: true,
    //   configurable: false
    // });


  }
}

