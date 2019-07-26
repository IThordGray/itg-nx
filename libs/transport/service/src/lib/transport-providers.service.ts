import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { TransportProvider } from './models/transport.provider';
import { TransportEventBusService } from './transport-event-bus.service';
import { TransportServiceModule } from './transport-service.module';
import { getGuid } from './utils/get-guid';

@Injectable({
  providedIn: TransportServiceModule
})
export class TransportProvidersService {

  private _providers: _.Dictionary<TransportProvider> = {};

  constructor(
    private eventBus: TransportEventBusService
  ) {
  }

  public register(provider: TransportProvider): TransportProvider {
    if (!provider.name) {
      provider.name = getGuid();
    }

    provider.eventBus = this.eventBus;

    this._providers[provider.name] = provider;

    return provider;
  }

  public get(name: string): TransportProvider {
    return this._providers[name];
  }

}
