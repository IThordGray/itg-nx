import { Injectable } from '@angular/core';
import { Dictionary, Guid } from '@itg/common';
import { TransportProvider } from './models/transport.provider';
import { TransportEventBusService } from './transport-event-bus.service';
import { TransportServiceModule } from './transport-service.module';

@Injectable({
  providedIn: TransportServiceModule
})
export class TransportProvidersService {

  private _providers: Dictionary<TransportProvider> = {};

  constructor(
    private eventBus: TransportEventBusService
  ) {
  }

  public register<T extends TransportProvider>(provider: T): T {
    if (!provider.name) {
      provider.name = Guid.newGuid();
    }

    provider.eventBus = this.eventBus;

    this._providers[provider.name] = provider;

    return provider;
  }

  public get(name: string): TransportProvider {
    return this._providers[name];
  }

}
