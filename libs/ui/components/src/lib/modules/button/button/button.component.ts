import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'itg-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() text: string = 'Button';

  constructor() { }

  ngOnInit() {
  }

}
