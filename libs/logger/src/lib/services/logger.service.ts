import { Injectable, InjectionToken, Inject } from '@angular/core';
import { LogEntry } from '../models/log-entry';
import { LogLevel } from '../models/log-level.enum';
import { LogProvider } from '../providers/log.provider.abstract';
import { ILoggerConfig } from "../models/logger-config.interface";
import { Type } from '@angular/compiler';

export const LOG_PROVIDERS_TOKEN = new InjectionToken<LogProvider[]>(
  'Log config token'
);

@Injectable()
export class LoggerService {
  constructor(@Inject(LOG_PROVIDERS_TOKEN) private providers: LogProvider[] = []) { }

  private shouldLog(requestingLogLevel: LogLevel, requiredLogLevel: LogLevel): boolean {
    if (requiredLogLevel === LogLevel.Trace) {
      return true;
    }

    return !(
      requestingLogLevel === LogLevel.Off ||
      requestingLogLevel < requiredLogLevel
    );
  }

  private writeToLog(message: string, logLevel: LogLevel, optionalParams: any[]): void {
    const entry: LogEntry = new LogEntry();
    entry.message = message;
    entry.logLevel = logLevel;
    entry.optionalParams = optionalParams;

    if (this.providers.length <= 0) {
      return;
    }

    this.providers.forEach(pub => {
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

  public get<T>(providerType: typeof LogProvider): T | LogProvider | undefined {
    return this.providers.find(p => p instanceof providerType);
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
