import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './models/utils/utils';

@NgModule()
export class LoggerModule {
  constructor(
    @Optional() @SkipSelf() parentModule: LoggerModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
