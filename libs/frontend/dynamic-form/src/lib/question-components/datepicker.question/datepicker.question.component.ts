import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IQuestionComponent } from '../../abstractions/question.component';
import { TextboxQuestion } from '../../abstractions/questions/_textbox.question';

@Component({
  selector: 'datepicker.question',
  templateUrl: './datepicker.question.component.html',
  styleUrls: [ './datepicker.question.component.scss' ]
})
export class DatepickerQuestionComponent implements IQuestionComponent<TextboxQuestion<Date>> {
  @Input() dyFormControl!: FormControl;
  @Input() question!: TextboxQuestion<Date>;
}
