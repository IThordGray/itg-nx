import { ISidebarConfig } from './sidebar-config.interface';
import { ISidebarRef } from './sidebar-ref.interface';

export interface ISidebarContainerConfig<D> extends ISidebarConfig<D> {
  parent?: ISidebarRef;
}