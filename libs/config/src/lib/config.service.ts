import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { cloneDeep as _cloneDeep, get as _get, set as _set } from 'lodash-es';
import { IConfigConfig } from './config.type';

export const CONFIG_VALUE_TOKEN = new InjectionToken<IConfigConfig>(
  'Config value'
);
export const CONFIG_PATH_TOKEN = new InjectionToken<string>('Config path');

@Injectable()
export class ConfigService {
  private _appConfig: IConfigConfig = {};
  private _path: string = undefined;

  constructor(
    @Optional() @Inject(CONFIG_VALUE_TOKEN) _obj?: IConfigConfig,
    @Optional() @Inject(CONFIG_PATH_TOKEN) _path?: string,
    @Optional() private _httpClient?: HttpClient
  ) {
    this._appConfig = _cloneDeep(_obj) || {};
    this._path = _path;
  }

  /** Get the config at a certain path.
   * @example
   * const value = this.configService.get('a.b.c');
   *
   * expect(this.get('a.b.c')).toBe(1);
   * expect(this.get('x')).toBe(2);
   * @param key Can be a full.stop.delimited.path
   * @param fallbackValue If specified, the fallback value will be returned if the config value can't be found.
   * @returns Returns the value of the config as a Readonly value
   */
  public get<T = any>(key?: string, fallbackValue?: any): T | undefined {
    if (!key) {
      return _cloneDeep(this._appConfig) as T;
    }

    return _cloneDeep(_get(this._appConfig, key, fallbackValue));
  }

  /** Set the config at a certain path.
   * @example
   * this.configService.set('a.b.c', 'SomeValue');
   *
   * @param key Can be a full.stop.delimited.path
   * @param value Can be a value of any type
   */
  public set(key: string, value: any): void {
    _set(this._appConfig, key, value);
  }

  public async loadConfig(): Promise<void> {
    if (!this._path) {
      throw new Error('Config path cannot be null or empty.');
    }

    if (!this._httpClient) {
      throw new Error('No HttpClient was provided.');
    }

    this._appConfig = await this._httpClient.get(this._path).toPromise();
  }
}
