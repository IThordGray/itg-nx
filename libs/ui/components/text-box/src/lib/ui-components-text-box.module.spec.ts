import { async, TestBed } from '@angular/core/testing';
import { UiComponentsTextBoxModule } from './ui-components-text-box.module';

describe('UiComponentsTextBoxModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiComponentsTextBoxModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiComponentsTextBoxModule).toBeDefined();
  });
});
