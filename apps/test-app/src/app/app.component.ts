import { Component } from '@angular/core';
import { TransportService } from '@itg/transport/service';
import { LoggerService } from '@itg/logger';
import { combineLatest } from 'rxjs';

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
