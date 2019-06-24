import { TestBed } from '@angular/core/testing';
import { LoggerModule } from './logger.module';
import { LoggerService } from './services/logger.service';
import { MockProvider } from './test-utils/mock-provider';

describe('LoggerModule', () => {
  it('should create a LoggerService without any LogProviders', () => {
    TestBed.configureTestingModule({
      imports: [LoggerModule.withConfig({})]
    });

    const logger = TestBed.get(LoggerService);
    expect(logger).toBeTruthy();
    expect((<any>logger).providers.length).toBe(0);
  });

  it('should create a LoggerService with a MockProvider', () => {
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

    const logger = TestBed.get(LoggerService);
    expect((<any>logger).providers.length).toBe(1);
    expect((<any>logger).providers[0] instanceof MockProvider).toBe(true);
  });
});
