import { Component, inject, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IQuestionComponent } from '../abstractions/question.component';
import { Question } from '../abstractions/questions/_question';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: [ './dynamic-form-question.component.scss' ]
})
export class DynamicFormQuestionComponent implements OnInit {
  #viewContainerRef = inject(ViewContainerRef);

  @Input() question!: Question<unknown>;
  @Input() dyFormControl!: FormControl;

  ngOnInit(): void {
    if (!this.question) return;
    if (!this.dyFormControl) return;
    const componentRef = this.#viewContainerRef.createComponent<IQuestionComponent>(this.question.controlType);
    componentRef.instance.question = this.question;
    componentRef.instance.dyFormControl = this.dyFormControl;
  }

}
