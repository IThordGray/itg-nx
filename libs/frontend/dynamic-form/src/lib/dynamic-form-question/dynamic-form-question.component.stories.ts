import type { Meta, StoryObj } from '@storybook/angular';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

const meta: Meta<DynamicFormQuestionComponent> = {
  component: DynamicFormQuestionComponent,
  title: 'DynamicFormQuestionComponent'
};
export default meta;
type Story = StoryObj<DynamicFormQuestionComponent>;

export const TextQuestion: Story = {
  args: {}
};

export const TextAreaQuestion: Story = {
  args: {}
};

export const NumberQuestion: Story = {
  args: {}
};

export const DateQuestion: Story = {
  args: {}
};

export const TimeQuestion: Story = {
  args: {}
};

export const CheckboxQuestion: Story = {
  args: {}
};

export const ToggleQuestion: Story = {
  args: {}
};

export const SelectQuestion: Story = {
  args: {}
};

export const AutocompleteQuestion: Story = {
  args: {}
};
