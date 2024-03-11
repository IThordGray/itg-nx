import { TemplateRef, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TSidebarContent } from '../abstractions/component-or-template.type';
import { ISidebarConfig } from '../abstractions/interfaces/sidebar-config.interface';
import { ISidebarRef } from '../abstractions/interfaces/sidebar-ref.interface';
import { SidebarContainerComponent } from '../components/sidebar-container/sidebar-container.component';
import { Sidebar } from '../sidebar.service';

export class TestSidebarService implements Sidebar {

  sidebarContainer?: SidebarContainerComponent;

  openAsync<T, D = any>(component: Type<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<T>>;
  openAsync<T, D = any>(template: TemplateRef<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<null>>;
  openAsync<T, D = any>(componentOrTemplate: TSidebarContent<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<T>> {
    throw new Error('Method not implemented.');
  }
}

describe('Basic Functionality', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SidebarContainerComponent ],
    }).compileComponents();
  });

  it('should open the sidebar through the service', () => {
    // Test implementation
  });

  it('should close the sidebar upon invoking the close method', () => {
    // Test implementation
  });

  it('should emit an event when the sidebar is opened', () => {
    // Test implementation
  });

  it('should emit an event when the sidebar is closed', () => {
    // Test implementation
  });
});