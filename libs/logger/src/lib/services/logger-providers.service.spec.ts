import { TestBed } from '@angular/core/testing';

import { LoggerProvidersService } from './logger-providers.service';

describe('LoggerProvidersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggerProvidersService = TestBed.get(LoggerProvidersService);
    expect(service).toBeTruthy();
  });
});
