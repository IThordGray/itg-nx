import { LogEntry } from '../models/log-entry';
import { ILogProviderConfig } from '../models/log-provider-config';

export abstract class LogProvider {

  protected constructor(
    public config: ILogProviderConfig
  ) {
  }

  public abstract clear(): void;

  public abstract trace(entry: LogEntry): void;

  public abstract debug(entry: LogEntry): void;

  public abstract info(entry: LogEntry): void;

  public abstract warn(entry: LogEntry): void;

  public abstract error(entry: LogEntry): void;

  public abstract fatal(entry: LogEntry): void;

}
