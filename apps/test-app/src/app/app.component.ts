import { Component } from '@angular/core';
import { LoggerService } from '@itg/logger/service';
import { TransportService } from '@itg/transport/service';

@Component({
  selector: 'itg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private transportService: TransportService,
    private _logger: LoggerService
  ) {
    this.transportService.onMessage$.subscribe(e => {
      this._logger.info(JSON.stringify(e));
    });
  }

  async sendMessage() {
    // this.transportService.publish({
    //   messageId: '123',
    //   messageType: 'TEST.TRANSCEIVE',
    //   payload: {
    //     someVar: 123
    //   }
    // });
  }
}
