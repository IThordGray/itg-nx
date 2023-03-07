import { FormControl } from '@angular/forms';
import { Question } from './questions/_question';

export interface IQuestionComponent<TQuestion extends Question<unknown> = Question<unknown>> {
  question: TQuestion;
  dyFormControl: FormControl;
}
