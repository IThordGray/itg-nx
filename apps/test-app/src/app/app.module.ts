import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BootstrapModule } from '@itg/bootstrap';
import { ConfigService } from '@itg/config';
import { LoggerModule } from '@itg/logger';
import { TransportProvidersService, TransportServiceModule } from '@itg/transport/service';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    BootstrapModule
      .withOptions({environment}),

    TransportServiceModule,
    LoggerModule,

    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    configService: ConfigService,
    transportProviders: TransportProvidersService,
    httpClient: HttpClient
  ) {

    // transportProviders
    //   .register(new HttpProvider(httpClient))
    //   .registerMessageFilters([])
    //   .registerEndpoints(httpEndpoints) 
    //   .startAsync({
    //     baseUrl: 'https://mocky.io/'
    //   });

    // transportProviders
    //   .register(new SignalRProvider())
    //   .registerMessageFilters(['TEST.TRANSCEIVE'])
    //   .startAsync('https://localhost:5001/hub');

    // transportProviders
    //   .register(new MockTProvider())
    //   .addMessageFilters(['TEST.TRANSCEIVE2'])
    //   .startAsync();
  }


}
