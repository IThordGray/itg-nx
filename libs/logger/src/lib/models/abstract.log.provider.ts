import { LogEntry } from './log-entry';
import { ILogProviderConfig } from './log-provider-config';

export abstract class LogProvider {

  public name: string;

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
