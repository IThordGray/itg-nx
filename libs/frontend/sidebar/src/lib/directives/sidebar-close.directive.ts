import { Directive, HostListener, inject, Input } from '@angular/core';
import { SIDEBAR_REF } from '../abstractions/injection-tokens';

@Directive({
  standalone: true,
  selector: '[itg-sidebar-close]'
})
export class SidebarCloseDirective {
  private readonly _sidebarRef = inject(SIDEBAR_REF);

  @Input('itg-sidebar-close') result: any;

  @HostListener('click')
  close = () => this._sidebarRef.close(this.result);

}