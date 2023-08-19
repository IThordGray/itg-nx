import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSearchWrapperComponent } from './mat-search-wrapper.component';

describe('MatSelectHeaderComponent', () => {
  let component: MatSearchWrapperComponent;
  let fixture: ComponentFixture<MatSearchWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatSearchWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatSearchWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
