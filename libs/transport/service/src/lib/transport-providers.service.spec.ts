import { TestBed } from '@angular/core/testing';

import { TransportProvidersService } from './transport-providers.service';

describe('TransportProvidersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportProvidersService = TestBed.get(TransportProvidersService);
    expect(service).toBeTruthy();
  });
});
