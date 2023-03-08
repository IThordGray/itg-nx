import { TextboxQuestion } from './_textbox.question';

export class NumberQuestion extends TextboxQuestion<number> {
  override type = 'number';
}
