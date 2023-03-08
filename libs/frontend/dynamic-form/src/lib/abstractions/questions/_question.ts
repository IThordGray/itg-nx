import { Type } from '@angular/core';
import { IQuestionComponent } from '../question.component';

export interface IQuestionOptions<TValue> {
  value: TValue | undefined;
  key: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export abstract class Question<TValue> {
  abstract controlType: Type<IQuestionComponent>;
  key!: string;
  value: TValue | undefined;
  label: string | undefined;
  required: boolean | undefined;
  disabled: boolean | undefined;

  constructor(args: IQuestionOptions<TValue>) {
    Object.assign(this, args);
  }
}
