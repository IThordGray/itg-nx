import { Component, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Guard } from '@ithordgray/shared-utils';
import { BaseQuestionComponent, Question } from '../abstractions/models';

@Component({
  selector: 'tg-dynamic-form-question',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: [ './dynamic-form-question.component.scss' ]
})
export class DynamicFormQuestionComponent implements OnInit {
  private readonly _viewContainerRef = inject(ViewContainerRef);

  @Input() question!: Question<unknown>;
  @Input() formControl!: FormControl;

  ngOnInit(): void {
    Guard.againstNullOrEmpty(this.question, 'question');
    Guard.againstNullOrEmpty(this.formControl, 'formControl');

    const componentRef = this._viewContainerRef.createComponent<BaseQuestionComponent>(this.question.component);
    componentRef.instance.question = this.question;
    componentRef.instance.formControl = this.formControl;
  }
}
