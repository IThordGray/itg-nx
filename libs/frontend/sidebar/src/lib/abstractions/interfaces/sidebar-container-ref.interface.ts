import { TemplateRef, Type } from '@angular/core';
import { TSidebarContent } from '../component-or-template.type';
import { ISidebarContainerConfig } from './sidebar-container-config.interface';
import { ISidebarRef } from './sidebar-ref.interface';

export interface ISidebarContainerRef {
  instances: ISidebarRef[];

  openAsync<T, D = any, R = any>(component: Type<T>, sidebarConfig?: ISidebarContainerConfig<D>): Promise<ISidebarRef<T, R>>;
  openAsync<T, D = any, R = any>(template: TemplateRef<T>, sidebarConfig?: ISidebarContainerConfig<D>): Promise<ISidebarRef<null, R>>;
  openAsync<T, D = any, R = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig?: ISidebarContainerConfig<D>): Promise<ISidebarRef<T | null, R>>;
}