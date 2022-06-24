import { Injectable } from '@angular/core';
import { cloneDeep, get, set } from 'lodash-es';

@Injectable()
export class ConfigService {
  private readonly _config: Record<string, any> = {};

  constructor(
    defaultConfig?: Record<string, any>
  ) {
    this._config = cloneDeep(defaultConfig) ?? {};
  }

  /** Get the config at a certain path.
   * @example
   * const value = this.configService.get('a.b.c');
   *
   * expect(this.get('a.b.c')).toBe(1);
   * expect(this.get('x')).toBe(2);
   * @param path Can be a full.stop.delimited.path
   * @param fallbackValue If specified, the fallback value will be returned if the config value can't be found.
   * @returns Returns the value of the config as a Readonly value
   */
  public get<TConfigValue = any>(path?: string, fallbackValue?: any): TConfigValue | undefined {
    if (!path) return cloneDeep(this._config) as TConfigValue;

    return cloneDeep(get(this._config, path, fallbackValue));
  }

  /** Set the config at a certain path.
   * @example
   * this.configService.set('a.b.c', 'SomeValue');
   *
   * @param path Can be a full.stop.delimited.path
   * @param value Can be a value of any type
   */
  public set(path: string, value: any): void {
    set(this._config, path, value);
  }

}
