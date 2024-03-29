import { Log } from './log';
import { LogLevel } from './log-level';

export interface ILogProviderConfig {
  logLevel: LogLevel;
}

export abstract class LogProvider {

  constructor(
    public providerConfig: ILogProviderConfig
  ) {
  }

  abstract debug(entry: Log): void;

  abstract error(entry: Log): void;

  abstract fatal(entry: Log): void;

  abstract info(entry: Log): void;

  abstract trace(entry: Log): void;

  abstract warn(entry: Log): void;
}
