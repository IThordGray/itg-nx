import { async, TestBed } from '@angular/core/testing';
import { ConfigModule } from './config.module';

describe('ConfigModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ConfigModule).toBeDefined();
  });
});
