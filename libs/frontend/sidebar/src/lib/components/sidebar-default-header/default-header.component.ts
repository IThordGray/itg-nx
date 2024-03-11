import { Component, OnInit } from '@angular/core';
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

export class DefaultHeaderComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}