import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseQuestionComponent, Question } from '../abstractions/models';

export class TextQuestion extends Question<string> {
  component = TextQuestionComponent;
}

@Component({
  standalone: true,
  selector: 'text-question',
  imports: [ ReactiveFormsModule ],
  template: `
    <label [attr.for]="question.key">{{ question.label }}</label>
    <input data-testid="name" type="text" [formControl]="formControl"/>
  `
})
export class TextQuestionComponent extends BaseQuestionComponent<TextQuestion> {
  @Input() override question!: TextQuestion;
}

