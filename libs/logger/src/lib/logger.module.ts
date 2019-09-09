import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '@itg/common';

@NgModule()
export class LoggerModule {
  constructor(
    @Optional() @SkipSelf() parentModule: LoggerModule
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
