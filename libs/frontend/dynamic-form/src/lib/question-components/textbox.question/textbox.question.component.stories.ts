import { Meta } from '@storybook/angular';
import { TextboxQuestionComponent } from './textbox.question.component';

export default {
  title: 'TextboxQuestionComponent',
  component: TextboxQuestionComponent
} as Meta<TextboxQuestionComponent>;

export const Primary = {
  render: (args: TextboxQuestionComponent) => ({
    props: args,
  }),
  args: {
  },
};