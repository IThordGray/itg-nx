import { Component, inject } from '@angular/core';
import { SIDEBAR_REF } from '../../abstractions/injection-tokens';
import { SidebarInstanceComponent } from '../sidebar-instance/sidebar-instance.component';

@Component({
  standalone: true,
  selector: 'itg-sidebar-custom-header',
  templateUrl: 'sidebar-custom-header.component.html',
  styleUrl: 'sidebar-custom-header.component.scss'
})

export class SidebarCustomHeaderComponent {

  private readonly _sidebarRef = inject<SidebarInstanceComponent>(SIDEBAR_REF);

  constructor() {
    this._sidebarRef.destroyDefaultHeader();
  }

}