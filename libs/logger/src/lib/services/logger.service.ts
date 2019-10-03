import { Injectable } from '@angular/core';
import { LoggerModule } from '../logger.module';
import { LogEntry } from '../models/log-entry';
import { LogProvider } from '../models/abstract.log.provider';
import { LoggerProvidersService } from './logger-providers.service';
import { LogLevel } from '@itg/logger/abstractions';

@Injectable({
  providedIn: LoggerModule
})
export class LoggerService {
  constructor(private providers: LoggerProvidersService) {}

  private shouldLog(
    requestingLogLevel: LogLevel,
    requiredLogLevel: LogLevel
  ): boolean {
    if (requiredLogLevel === LogLevel.Trace) {
      return true;
    }

    return !(
      requestingLogLevel === LogLevel.Off ||
      requestingLogLevel < requiredLogLevel
    );
  }

  private writeToLog(
    message: string,
    logLevel: LogLevel,
    optionalParams: any[]
  ): void {
    const entry: LogEntry = new LogEntry();
    entry.message = message;
    entry.logLevel = logLevel;
    entry.optionalParams = optionalParams;

    const providers: LogProvider[] = this.providers.get();
    if (providers.length <= 0) {
      return;
    }

    providers.forEach(pub => {
      if (!this.shouldLog(logLevel, pub.config.logLevel)) {
        return;
      }

      switch (logLevel) {
        case LogLevel.Trace: {
          pub.trace(entry);
          break;
        }
        case LogLevel.Debug: {
          pub.debug(entry);
          break;
        }
        case LogLevel.Info: {
          pub.info(entry);
          break;
        }
        case LogLevel.Warn: {
          pub.warn(entry);
          break;
        }
        case LogLevel.Error: {
          pub.error(entry);
          break;
        }
        case LogLevel.Fatal: {
          pub.fatal(entry);
          break;
        }
      }
    });
  }

  public get<T = LogProvider>(name: string): T | LogProvider | undefined {
    return this.providers.get(name);
  }

  public clear(): void {
    const providers: LogProvider[] = this.providers.get();
    if (providers.length <= 0) {
      return;
    }

    providers.forEach(pub => {
      pub.clear();
    });
  }

  public trace(message: string, ...optionalParams: any[]): void {
    this.writeToLog(message, LogLevel.Trace, optionalParams);
  }

  public debug(message: string, ...optionalParams: any[]): void {
    this.writeToLog(message, LogLevel.Debug, optionalParams);
  }

  public info(message: string, ...optionalParams: any[]): void {
    this.writeToLog(message, LogLevel.Info, optionalParams);
  }

  public warn(message: string, ...optionalParams: any[]): void {
    this.writeToLog(message, LogLevel.Warn, optionalParams);
  }

  public error(message: any, ...optionalParams: any[]): void {
    const messageToDisplay = message instanceof Error ? message.stack : message;

    this.writeToLog(messageToDisplay, LogLevel.Error, optionalParams);
  }

  public fatal(message: string, ...optionalParams: any[]): void {
    this.writeToLog(message, LogLevel.Fatal, optionalParams);
  }
}
