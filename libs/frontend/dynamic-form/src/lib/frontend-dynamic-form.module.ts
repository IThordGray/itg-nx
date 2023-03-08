import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { TextboxQuestionComponent } from './question-components/textbox.question/textbox.question.component';
import { DatepickerQuestionComponent } from './question-components/datepicker.question/datepicker.question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    TextboxQuestionComponent,
    DatepickerQuestionComponent
  ],
  exports: [ DynamicFormComponent ]
})
export class FrontendDynamicFormModule {
}
