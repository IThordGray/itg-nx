import { Component, inject } from '@angular/core';
import { SIDEBAR_CONFIG } from '../../abstractions/injection-tokens';
import { SidebarCloseComponent } from '../sidebar-close/sidebar-close.component';
import { SidebarSubtitleComponent } from '../sidebar-subtitle/sidebar-subtitle.component';
import { SidebarTitleComponent } from '../sidebar-title/sidebar-title.component';

@Component({
  standalone: true,
  selector: 'default-header',
  templateUrl: 'default-header.component.html',
  imports: [
    SidebarSubtitleComponent,
    SidebarTitleComponent,
    SidebarCloseComponent
  ],
  styleUrl: 'default-header.component.scss'
})

export class DefaultHeaderComponent {
  private readonly _sidebarConfig = inject(SIDEBAR_CONFIG);

  get heading(): string | undefined {
    return this._sidebarConfig.heading as string;
  }

  get subheading(): string | undefined {
    return this._sidebarConfig.subheading;
  }
}