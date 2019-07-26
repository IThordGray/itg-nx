import { TestBed } from '@angular/core/testing';

import { TransportEventBusService } from './transport-event-bus.service';

describe('TransportEventBusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransportEventBusService = TestBed.get(TransportEventBusService);
    expect(service).toBeTruthy();
  });
});
