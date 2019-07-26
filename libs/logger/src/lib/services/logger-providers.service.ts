import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { getGuid } from '../../../../transport/service/src/lib/utils/get-guid';
import { LoggerModule } from '../logger.module';
import { LogProvider } from '../models/abstract.log.provider';

@Injectable({
  providedIn: LoggerModule
})
export class LoggerProvidersService {

  private _providers: _.Dictionary<LogProvider> = {};

  constructor() {
  }

  public register(provider: LogProvider): LogProvider {
    if (!provider.name) {
      provider.name = getGuid();
    }

    this._providers[provider.name] = provider;

    return provider;
  }

  public get(): LogProvider[];
  public get(name: string): LogProvider;
  public get(name?: string): LogProvider | LogProvider[] {
    if (name) {
      return this._providers[name];
    }

    return _.values(this._providers);
  }
}
