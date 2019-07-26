import { async, TestBed } from '@angular/core/testing';
import { TransportServiceModule } from './transport-service.module';

describe('TransportServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransportServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TransportServiceModule).toBeDefined();
  });
});
