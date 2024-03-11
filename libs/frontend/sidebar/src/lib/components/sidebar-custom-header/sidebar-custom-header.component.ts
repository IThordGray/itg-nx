import { Component, inject } from '@angular/core';
import { SIDEBAR_REF } from '../../abstractions/injection-tokens';

@Component({
  standalone: true,
  selector: 'itg-sidebar-custom-header',
  templateUrl: 'sidebar-custom-header.component.html',
  styleUrl: 'sidebar-custom-header.component.scss'
})

export class SidebarCustomHeaderComponent {

  private readonly _sidebarRef = inject(SIDEBAR_REF);

  constructor() {
    this._sidebarRef.instanceComponentRef.instance.destroyDefaultHeader();
  }

}