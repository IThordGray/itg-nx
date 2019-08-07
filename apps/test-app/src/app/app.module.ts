import { HttpClient, HttpClientModule } from '@angular/common/http';
import { htmlAstToRender3Ast } from '@angular/compiler/src/render3/r3_template_transform';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModule } from '@itg/bootstrap';
import { ConsoleLogProvider, LoggerModule, LogLevel } from '@itg/logger';
import { TransportProvidersService, TransportServiceModule } from '@itg/transport/service';
import { LoggerProvidersService } from '../../../../libs/logger/src/lib/services/logger-providers.service';
import { HttpProvider } from '../../../../libs/transport/providers/src/lib/http.provider';
import { AppComponent } from './app.component';
import { httpEndpoints } from './mocks/http-endpoints';
import { MockTProvider } from './mocks/mock-transport.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    BootstrapModule,
    TransportServiceModule,
    LoggerModule,

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    loggerProviders: LoggerProvidersService,
    transportProviders: TransportProvidersService,
    httpClient: HttpClient
  ) {

    loggerProviders
      .register(new ConsoleLogProvider({
        logLevel: LogLevel.Info
      }));

    transportProviders
      .register(new HttpProvider(httpClient))
      .addMessageFilters([])
      .registerEndpoints(httpEndpoints)
      .startAsync({
        baseUrl: 'http://www.mocky.io/'
      });


    transportProviders
      .register(new MockTProvider())
      .addMessageFilters(['TEST2.TRANSCEIVE'])
      .startAsync();
  }


}
