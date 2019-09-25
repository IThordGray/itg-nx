import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'itg-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input()
  public label: string = undefined;

  @Input()
  public placeholder: string = undefined;

  @Input()
  public readonly: boolean = undefined;

  @Input()
  public type:
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week' = undefined;


  constructor() { }

  ngOnInit() {
  }

  public focus(): void {

  }

  public clear(): void {

  }
}
