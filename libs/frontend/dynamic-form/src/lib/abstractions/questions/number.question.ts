import { TextboxQuestion } from './_textbox.question';

export class NumberQuestion extends TextboxQuestion<number> {
  override controlType = 'textbox';
  override type = 'number';
}
