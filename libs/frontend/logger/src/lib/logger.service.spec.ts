import { TestBed } from '@angular/core/testing';
import { LogProvider } from './abstractions/abstract-log-provider';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level.enum';
import { LoggerService } from './logger.service';

/* eslint-disable */
export class MockProvider extends LogProvider {

  constructor() {
    super({ logLevel: LogLevel.Debug });
  }

  debug(entry: Log): void {
  }

  error(entry: Log): void {
  }

  fatal(entry: Log): void {
  }

  info(entry: Log): void {
  }

  trace(entry: Log): void {
  }

  warn(entry: Log): void {
  }

}

describe('LoggerService', () => {
  let logger!: LoggerService;

  beforeEach(() => {
    logger = TestBed.inject(LoggerService);
  });

  it('should log all on LogLevel.Trace', () => {
    expect(logger.shouldLog(LogLevel.Trace, LogLevel.Trace)).toBe(true);
    expect(logger.shouldLog(LogLevel.Info, LogLevel.Trace)).toBe(true);
    expect(logger.shouldLog(LogLevel.Warn, LogLevel.Trace)).toBe(true);
    expect(logger.shouldLog(LogLevel.Error, LogLevel.Trace)).toBe(true);
    expect(logger.shouldLog(LogLevel.Fatal, LogLevel.Trace)).toBe(true);
  });

  it('should log none on LogLevel.Off', () => {
    expect(logger.shouldLog(LogLevel.Trace, LogLevel.Off)).toBe(false);
    expect(logger.shouldLog(LogLevel.Info, LogLevel.Off)).toBe(false);
    expect(logger.shouldLog(LogLevel.Warn, LogLevel.Off)).toBe(false);
    expect(logger.shouldLog(LogLevel.Error, LogLevel.Off)).toBe(false);
    expect(logger.shouldLog(LogLevel.Fatal, LogLevel.Off)).toBe(false);
  });

  it('should get the MockProvider instance and set the config', () => {
    const x: MockProvider = logger.get(MockProvider);
    expect(x).toBeTruthy();

    expect(x.providerConfig.logLevel).toBe(LogLevel.Debug);
    x.providerConfig.logLevel = LogLevel.Off;
    expect(x.providerConfig.logLevel).toBe(LogLevel.Off);
  });

  it('should not log LogLevel.Trace on LogLevel.Info', () => {
    expect(logger.shouldLog(LogLevel.Trace, LogLevel.Info)).toBe(false);
  });

  it('should not log LogLevel.Info on LogLevel.Warn', () => {
    expect(logger.shouldLog(LogLevel.Info, LogLevel.Warn)).toBe(false);
  });

  it('should not log LogLevel.Warn on LogLevel.Error', () => {
    expect(logger.shouldLog(LogLevel.Warn, LogLevel.Error)).toBe(false);
  });

  it('should not log LogLevel.Error on LogLevel.Fatal', () => {
    expect(logger.shouldLog(LogLevel.Error, LogLevel.Fatal)).toBe(false);
  });

  it('should log LogLevel.Fatal on LogLevel.Error', () => {
    expect(logger.shouldLog(LogLevel.Fatal, LogLevel.Error)).toBe(true);
  });

  it('should log LogLevel.Error on LogLevel.Warn', () => {
    expect(logger.shouldLog(LogLevel.Error, LogLevel.Warn)).toBe(true);
  });

  it('should log LogLevel.Warn on LogLevel.Info', () => {
    expect(logger.shouldLog(LogLevel.Warn, LogLevel.Info)).toBe(true);
  });

  it('should log LogLevel.Info on LogLevel.Trace', () => {
    expect(logger.shouldLog(LogLevel.Info, LogLevel.Trace)).toBe(true);
  });
});
