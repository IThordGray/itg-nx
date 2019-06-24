import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { DefaultNotifyProvider } from './models/default-notification.provider.class';
import { NotifyService } from './models/notification.provider.interface';

@NgModule()
export class NotifyModule {
  public static withDefaultProvider(): ModuleWithProviders {
    return {
      ngModule: NotifyModule,
      providers: [
        { provide: NotifyService, useClass: DefaultNotifyProvider }
      ]
    }
  }

  public static withCustomProviders(providers: Provider[]): ModuleWithProviders {
    return {
      ngModule: NotifyModule,
      providers: providers
    };
  }
}
