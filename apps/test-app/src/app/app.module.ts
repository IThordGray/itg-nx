import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ConfigModule, ConfigService } from '@itg/config';
import { ConsoleLogProvider, LoggerModule, LoggerService } from '@itg/logger';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    ConfigModule.withValue({
      debug: true
    }),
    LoggerModule.withConfig({
      providers: [
        { provider: ConsoleLogProvider }
      ]
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  // Used to adjust the logger.
  constructor(
    config: ConfigService,
    logger: LoggerService
  ) {

  }
}
