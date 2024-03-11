import { TSidebarContent } from '../component-or-template.type';
import { ISidebarConfig } from './sidebar-config.interface';
import { ISidebarRef } from './sidebar-ref.interface';

export interface ISidebarContainerRef {
  instances: ISidebarRef[];
  openAsync: <T, D = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig: ISidebarConfig<D> & {
    parent: ISidebarRef
  }) => Promise<ISidebarRef<T | null>>;
}