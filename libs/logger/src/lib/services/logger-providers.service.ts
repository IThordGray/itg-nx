import { Injectable } from '@angular/core';
import { Guid } from '@itg/common';
import { values as _values } from 'lodash-es';
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
      provider.name = Guid.newGuid();
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

    return _values(this._providers);
  }
}
