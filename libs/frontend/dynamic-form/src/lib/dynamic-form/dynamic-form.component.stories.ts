import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';

import { within } from '@storybook/testing-library';
import { TextQuestion } from '../questions/text.question';
import { DynamicFormComponent } from './dynamic-form.component';

const meta: Meta<DynamicFormComponent> = {
  component: DynamicFormComponent,
  title: 'DynamicFormComponent'
};
export default meta;
type Story = StoryObj<DynamicFormComponent>;

export const Primary: Story = {
  args: {
    questions: [
      new TextQuestion({
        key: 'name',
        label: 'Name',
        value: 'John Doe'
      })
    ]
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('name')).toBeTruthy();
    expect((canvas.getByTestId('name') as HTMLInputElement).value).toBe('John Doe');
  }
};
