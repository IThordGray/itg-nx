import { Input, Type } from '@angular/core';
import { AsyncValidatorFn, FormControl, ValidatorFn } from '@angular/forms';

export abstract class BaseQuestionComponent<TQuestion extends Question<unknown> = Question<unknown>> {
  @Input() question!: TQuestion;
  @Input() formControl!: FormControl;
}

export interface IQuestionOptions<TValue> {
  value: TValue | undefined;
  key: string;
  label?: string;
  disabled?: boolean;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}

export abstract class Question<TValue> {
  abstract component: Type<BaseQuestionComponent>;
  key!: string;
  value: TValue | undefined;
  label?: string | undefined;
  disabled?: boolean | undefined;
  validators?: ValidatorFn | ValidatorFn[];
  asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];

  constructor(args: IQuestionOptions<TValue>) {
    Object.assign(this, args);
  }
}
