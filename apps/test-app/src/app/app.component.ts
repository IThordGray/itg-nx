import { Component } from '@angular/core';
import { TransportService } from '@itg/transport/service';

@Component({
  selector: 'itg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private transportService: TransportService
  ) {

    this.transportService.onMessage$.subscribe(e => {
      console.info(e);
    });

    this.transportService.publish({
      messageId: '123',
      messageType: 'TEST.TRANSCEIVE',
      payload: {
        someVar: 123
      }
    });
  }

}
