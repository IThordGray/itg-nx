import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModule } from '@itg/bootstrap';
import { ConsoleLogProvider, LoggerModule, LogLevel } from '@itg/logger';
import { TransportProvidersService, TransportServiceModule } from '@itg/transport/service';
import { LoggerProvidersService } from '../../../../libs/logger/src/lib/services/logger-providers.service';
import { AppComponent } from './app.component';
import { MockTProvider } from './mocks/mock-transport.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    BootstrapModule,
    TransportServiceModule,
    LoggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    loggerProviders: LoggerProvidersService,
    transportProviders: TransportProvidersService
  ) {

    loggerProviders
      .register(new ConsoleLogProvider({
        logLevel: LogLevel.Info
      }));

    transportProviders
      .register(new MockTProvider())
      .addMessageFilters(['TEST.TRANSCEIVE'])
      .startAsync();
  }


}
