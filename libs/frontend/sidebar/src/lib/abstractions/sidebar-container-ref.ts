import { SidebarContainerComponent } from '../components/sidebar-container/sidebar-container.component';
import { TSidebarContent } from './component-or-template.type';
import { ISidebarConfig } from './interfaces/sidebar-config.interface';
import { ISidebarContainerRef } from './interfaces/sidebar-container-ref.interface';
import { ISidebarRef } from './interfaces/sidebar-ref.interface';

export class SidebarContainerRef implements ISidebarContainerRef {

  readonly instances: ISidebarRef[] = [];

  constructor(
    public sidebarContainer: SidebarContainerComponent
  ) { }

  async openAsync<T, D = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig: ISidebarConfig<D> & { parent?: any }): Promise<ISidebarRef<T | null>> {
    return await this.sidebarContainer.createSidebarInstanceAsync(componentOrTemplate, sidebarConfig);
  }
}