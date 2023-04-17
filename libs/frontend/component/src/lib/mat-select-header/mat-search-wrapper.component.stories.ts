import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { MatSearchWrapperComponent } from './mat-search-wrapper.component';

export default {
  title: 'MatSelectHeaderComponent',
  component: MatSearchWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatSearchWrapperComponent
      ]
    })
  ]
} as Meta<MatSearchWrapperComponent>;

const Template: Story<MatSearchWrapperComponent> = (args: MatSearchWrapperComponent) => ({
  props: { ...args },
  template: `
    <mat-form-field appearance="outline">
        <mat-select>

            <mat-select-trigger>
                xxxx
            </mat-select-trigger>

            <mat-search-wrapper [heading]="heading" [searchLabel]="searchLabel">
              <mat-option [value]="1">Option 1</mat-option>
              <mat-option [value]="2">Option 2</mat-option>
              <mat-option [value]="3">Option 3</mat-option>
              <mat-option [value]="4">Option 4</mat-option>
              <mat-option [value]="5">Option 5</mat-option>
              <mat-option [value]="6">Option 6</mat-option>
              <mat-option [value]="7">Option 7</mat-option>
              <mat-option [value]="8">Option 8</mat-option>
              <mat-option [value]="9">Option 9</mat-option>
            </mat-search-wrapper>

        </mat-select>
    </mat-form-field>
  `
});

export const Primary = Template.bind({});
Primary.args = {
  heading: 'Heading',
  searchLabel: 'Search options'
};
