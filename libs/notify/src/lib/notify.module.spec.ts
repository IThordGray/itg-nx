import { async, TestBed } from '@angular/core/testing';
import { NotifyModule } from './notify.module';

describe('NotifyModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NotifyModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NotifyModule).toBeDefined();
  });
});
