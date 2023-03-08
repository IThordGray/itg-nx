import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from './abstractions/questions/_question';

@Component({
  selector: 'itg-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: [ './dynamic-form.component.scss' ]
})
export class DynamicFormComponent {
  #questions!: Question<unknown>[];
  formGroup = new FormGroup({});

  @Input() get questions(): Question<unknown>[] {
    return this.#questions;
  }

  set questions(value: Question<unknown>[]) {
    this.#questions = value;
    console.log(value);
    value?.forEach(question => {
      const fc = new FormControl(question.value);
      if (question.required) fc.setValidators(Validators.required);
      this.formGroup.addControl(question.key, fc);
    });
  }

  reset(): void {
    this.formGroup.reset();
  }

}
