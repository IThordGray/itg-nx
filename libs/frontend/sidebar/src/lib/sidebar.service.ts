import { TemplateRef, Type } from '@angular/core';
import { TSidebarContent } from './abstractions/component-or-template.type';
import { ISidebarConfig } from './abstractions/interfaces/sidebar-config.interface';
import { ISidebarRef } from './abstractions/interfaces/sidebar-ref.interface';

export abstract class Sidebar {
  abstract openAsync<T, D = any>(component: Type<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<T>>;
  abstract openAsync<T, D = any>(template: TemplateRef<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<null>>;
  abstract openAsync<T, D = any>(componentOrTemplate: TSidebarContent<T>, config?: ISidebarConfig<D>): Promise<ISidebarRef<T | null>>;
}