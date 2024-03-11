import { Component, inject } from '@angular/core';
import { SIDEBAR_REF } from '../../abstractions/injection-tokens';

@Component({
  standalone: true,
  selector: 'itg-sidebar-close',
  templateUrl: 'sidebar-close.component.html',
  styleUrl: 'sidebar-close.component.scss'
})

export class SidebarCloseComponent {
  private readonly _sidebarRef = inject(SIDEBAR_REF);

  close = () => this._sidebarRef.close();

  createRipple($event: MouseEvent): void {
    const button = $event.currentTarget as HTMLButtonElement;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${ diameter }px`;
    circle.style.left = `${ $event.clientX - button.offsetLeft - radius }px`;
    circle.style.top = `${ $event.clientY - button.offsetTop - radius }px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    button.appendChild(circle);
  }
}