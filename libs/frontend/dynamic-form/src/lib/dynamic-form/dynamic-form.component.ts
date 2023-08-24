import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../abstractions/models';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'tg-dynamic-form',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, DynamicFormQuestionComponent ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: [ './dynamic-form.component.scss' ]
})
export class DynamicFormComponent {
  readonly formGroup = new FormGroup({});

  private _questions: Question<unknown>[] = [];

  @Input() get questions(): Question<unknown>[] {
    return this._questions;
  }

  set questions(value: Question<unknown>[]) {
    this._questions = value;
    this.formGroup.reset();
    this._questions.forEach(question => {
      const formControl = new FormControl(question.value);
      if (question.validators) formControl.setValidators(question.validators);
      if (question.asyncValidators) formControl.setAsyncValidators(question.asyncValidators);

      this.formGroup.addControl(question.key, formControl);
    });
  }

  reset(): void {
    this.formGroup.reset();
  }
}
