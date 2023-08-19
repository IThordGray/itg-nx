import { Input, Type } from '@angular/core';
import { FormControl } from '@angular/forms';

export abstract class BaseQuestionComponent<TQuestion extends Question<unknown> = Question<unknown>> {
  @Input() question!: TQuestion;
  @Input() formControl!: FormControl;
}

export interface IQuestionOptions<TValue> {
  value: TValue | undefined;
  key: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

export abstract class Question<TValue> {
  abstract component: Type<BaseQuestionComponent>;
  key!: string;
  value: TValue | undefined;
  label: string | undefined;
  required: boolean | undefined;
  disabled: boolean | undefined;

  protected constructor(args: IQuestionOptions<TValue>) {
    Object.assign(this, args);
  }
}
