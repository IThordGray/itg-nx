import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { DateQuestion } from './abstractions/questions/date.question';
import { TextQuestion } from './abstractions/questions/text.question';
import { DynamicFormComponent } from './dynamic-form.component';
import { FrontendDynamicFormModule } from './frontend-dynamic-form.module';

export default {
  title: 'DynamicFormComponent',
  component: DynamicFormComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        FrontendDynamicFormModule
      ]
    })
  ]
} as Meta<DynamicFormComponent>;

const Template: Story<DynamicFormComponent> = (args: DynamicFormComponent) => ({
  props: { ...args }
});

export const Primary = Template.bind({});
Primary.args = {
  questions: [
    new TextQuestion({ label: 'Name', key: 'name', value: 'Ivor', required: true }),
    new DateQuestion({ label: 'Date of birth', key: 'dob', value: undefined }),
  ]
};
