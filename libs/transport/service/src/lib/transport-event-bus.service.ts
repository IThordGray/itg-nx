import { Injectable } from '@angular/core';
import { EventHandler, IRequestMessage, IResponseMessage } from '@itg/transport/abstractions';
import { TransportServiceModule } from './transport-service.module';

@Injectable({
  providedIn: TransportServiceModule
})
export class TransportEventBusService {
  public readonly requestHandler: EventHandler<IRequestMessage> = new EventHandler();
  public readonly responseHandler: EventHandler<IResponseMessage> = new EventHandler();
}
