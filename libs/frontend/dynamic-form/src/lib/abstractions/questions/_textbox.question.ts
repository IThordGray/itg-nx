import { TextboxQuestionComponent } from '../../question-components/textbox.question/textbox.question.component';
import { Question } from './_question';

export abstract class TextboxQuestion<TValue> extends Question<TValue> {
  abstract type: string;
  override controlType = TextboxQuestionComponent;
}
