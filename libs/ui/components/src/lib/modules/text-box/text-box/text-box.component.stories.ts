
import { UiComponentsModule } from '../../../ui-components.module';
import { TextBoxComponent } from './text-box.component';

export default {
  title: 'TextBoxComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: TextBoxComponent,
  props: {
  }
})
