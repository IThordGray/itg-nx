import { async, TestBed } from '@angular/core/testing';
import { TransportProvidersModule } from './transport-providers.module';

describe('TransportProvidersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TransportProvidersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TransportProvidersModule).toBeDefined();
  });
});
