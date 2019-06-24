import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ConfigService, CONFIG_PATH_TOKEN, CONFIG_VALUE_TOKEN } from '../lib/config.service';
import { IConfigConfig } from './config.type';

export function getWithValue(obj: IConfigConfig): ConfigService {
  return new ConfigService(obj);
}

export function getWithPath(
  path: string,
  httpClient: HttpClient
): ConfigService {
  return new ConfigService(null, path, httpClient);
}

@NgModule()
export class ConfigModule {
  // config service gets config through constructor
  public static withValue(obj: IConfigConfig): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: CONFIG_VALUE_TOKEN,
          useValue: obj
        },
        {
          provide: ConfigService,
          useFactory: getWithValue,
          deps: [CONFIG_VALUE_TOKEN]
        }
      ]
    };
  }

  // config service gets config from local json file
  // config service gets config from remote endpoint
  public static withPath(path: string): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: CONFIG_PATH_TOKEN,
          useValue: path
        },
        {
          provide: ConfigService,
          useFactory: getWithPath,
          deps: [CONFIG_PATH_TOKEN, HttpClient]
        }
      ]
    };
  }
}
