import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IQuestionComponent } from '../../abstractions/question.component';
import { TextboxQuestion } from '../../abstractions/questions/_textbox.question';

@Component({
  selector: 'textbox.question',
  templateUrl: './textbox.question.component.html',
  styleUrls: [ './textbox.question.component.scss' ]
})
export class TextboxQuestionComponent implements IQuestionComponent<TextboxQuestion<unknown>> {
  @Input() dyFormControl!: FormControl;
  @Input() question!: TextboxQuestion<unknown>;
}
