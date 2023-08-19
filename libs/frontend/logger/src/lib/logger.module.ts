import { NgModule } from '@angular/core';
import { LoggerProvidersService } from './logger-providers.service';

@NgModule()
export class LoggerModule {
  constructor(
    providerService: LoggerProvidersService
  ) {
    providerService.subscribeToProviders();
  }
}
