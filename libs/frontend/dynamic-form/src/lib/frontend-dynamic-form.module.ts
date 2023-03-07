import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { TextboxQuestionComponent } from './question-components/textbox.question/textbox.question.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, MatInputModule ],
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    TextboxQuestionComponent,
  ],
})
export class FrontendDynamicFormModule {}
