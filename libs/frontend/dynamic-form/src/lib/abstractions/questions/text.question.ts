import { TextboxQuestion } from './_textbox.question';

export class TextQuestion extends TextboxQuestion<string> {
  override controlType = 'textbox';
  override type = 'text';
}
