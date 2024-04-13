import { TemplateRef, Type } from '@angular/core';
import { TSidebarContent } from './abstractions/component-or-template.type';
import { ISidebarConfig } from './abstractions/interfaces/sidebar-config.interface';
import { ISidebarContainerRef } from './abstractions/interfaces/sidebar-container-ref.interface';
import { ISidebarRef } from './abstractions/interfaces/sidebar-ref.interface';

export abstract class Sidebar {
  sidebarContainerRef!: ISidebarContainerRef;

  abstract openAsync<T, D = any, R = any>(component: Type<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<T, R>>;
  abstract openAsync<T, D = any, R = any>(template: TemplateRef<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<null, R>>;
  abstract openAsync<T, D = any, R = any>(componentOrTemplate: TSidebarContent<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<T | null, R>>;
}