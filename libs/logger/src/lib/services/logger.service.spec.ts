import { TestBed } from '@angular/core/testing';
import { LoggerModule } from '../logger.module';
import { LogLevel } from '../models/log-level.enum';
import { MockProvider } from '../test-utils/mock-provider';
import { LoggerService } from './logger.service';

describe('LogService', () => {
  let logger: any | LoggerService = undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerModule.withConfig({
          providers: [
            {
              provider: MockProvider
            }
          ]
        })
      ]
    });

    logger = TestBed.get(LoggerService);
  });

  it('should be created with providers', () => {
    expect(logger).toBeTruthy();
    expect((<any>logger).providers.length).toBe(1);
    expect((<any>logger).providers[0] instanceof MockProvider).toBe(true);
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
