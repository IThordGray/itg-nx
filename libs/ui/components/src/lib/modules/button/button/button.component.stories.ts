import { text } from '@storybook/addon-knobs';
import { UiComponentsModule } from '../../../ui-components.module';
import { ButtonComponent } from './button.component';

export default {
  title: 'ButtonComponent',
  parameters: {
    componentSubtitle: 'Handy status label',

  }
}

export const primary = () => ({
  moduleMetadata: {
    declarations: [ButtonComponent]
  },
  template: `<itg-button>Some button</itg-button>`
})

export const withCustomText = () => ({
  component: ButtonComponent,
  props: {
    text: text('text', 'Custom text')
  }
})

export const someOtherStory = () => ({
  component: ButtonComponent,
  props: {
    text: text('text', 'Custom text')
  }
})