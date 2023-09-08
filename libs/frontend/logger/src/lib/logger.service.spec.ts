import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Log } from './abstractions/log';
import { LogLevel } from './abstractions/log-level';
import { LogProvider } from './abstractions/log-provider';
import { LOG_PROVIDERS } from './abstractions/log-providers.injection-token';
import { LoggerService } from './logger.service';

const getMockProvider: () => jest.MockedObject<LogProvider> = () => {
  return {
    providerConfig: { logLevel: LogLevel.Trace },
    logs$: new Subject<Log>(),
    shouldLog: jest.fn().mockReturnValue(true),
    subscribe: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    fatal: jest.fn(),
    info: jest.fn(),
    trace: jest.fn(),
    warn: jest.fn()
  };
};

describe('LoggerService', () => {
  let loggerService: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LOG_PROVIDERS,
          useValue: getMockProvider(),
          multi: true
        }
      ]
    });

    loggerService = TestBed.inject(LoggerService);
  });

  it('should log a debug message', () => {
    const providers = loggerService['_providers'] as Array<jest.MockedObject<LogProvider>>;

    const mockProviderDebug = jest.spyOn(providers[0], 'debug');

    const message = 'Debug message';
    const optionalParams = [ 'param1', 'param2' ];

    loggerService.debug(message, ...optionalParams);

    expect(mockProviderDebug).toHaveBeenCalledWith(
      expect.objectContaining({
        ...(new Log(message, LogLevel.Debug, optionalParams)),
        date: expect.any(Date)
      })
    );
  });

  it('should log an error message', () => {
    const providers = loggerService['_providers'] as Array<jest.MockedObject<LogProvider>>;
    const mockProviderError = jest.spyOn(providers[0], 'error');

    const message = 'Error message';

    loggerService.error(message);

    expect(mockProviderError).toHaveBeenCalledWith(
      expect.objectContaining({
        ...(new Log(message, LogLevel.Error)),
        date: expect.any(Date)
      })
    );
  });

  it('should log a fatal message', () => {
    const providers = loggerService['_providers'] as Array<jest.MockedObject<LogProvider>>;
    const mockProviderFatal = jest.spyOn(providers[0], 'fatal');

    const message = 'Fatal message';

    loggerService.fatal(message);

    expect(mockProviderFatal).toHaveBeenCalledWith(
      expect.objectContaining({
        ...(new Log(message, LogLevel.Fatal)),
        date: expect.any(Date)
      })
    );
  });

  it('should log an info message', () => {
    const providers = loggerService['_providers'] as Array<jest.MockedObject<LogProvider>>;
    const mockProviderInfo = jest.spyOn(providers[0], 'info');

    const message = 'Info message';
    const optionalParams = [ 'param1', 'param2' ];

    loggerService.info(message, ...optionalParams);

    expect(mockProviderInfo).toHaveBeenCalledWith(
      expect.objectContaining({
        ...(new Log(message, LogLevel.Info, optionalParams)),
        date: expect.any(Date)
      })
    );
  });

  it('should log a trace message', () => {
    const providers = loggerService['_providers'] as Array<jest.MockedObject<LogProvider>>;
    const mockProviderTrace = jest.spyOn(providers[0], 'trace');

    const message = 'Trace message';
    const optionalParams = [ 'param1', 'param2' ];

    loggerService.trace(message, ...optionalParams);

    expect(mockProviderTrace).toHaveBeenCalledWith(
      expect.objectContaining({
        ...(new Log(message, LogLevel.Trace, optionalParams)),
        date: expect.any(Date)
      })
    );
  });

  it('should log a warn message', () => {
    const providers = loggerService['_providers'] as Array<jest.MockedObject<LogProvider>>;
    const mockProviderWarn = jest.spyOn(providers[0], 'warn');

    const message = 'Warn message';
    const optionalParams = [ 'param1', 'param2' ];

    loggerService.warn(message, ...optionalParams);

    expect(mockProviderWarn).toHaveBeenCalledWith(
      expect.objectContaining({
        ...(new Log(message, LogLevel.Warn, optionalParams)),
        date: expect.any(Date)
      })
    );
  });
});
