import {
  DatepickerQuestionComponent
} from '../../question-components/datepicker.question/datepicker.question.component';
import { Question } from './_question';

export class DateQuestion extends Question<Date> {
  override controlType = DatepickerQuestionComponent;
}
