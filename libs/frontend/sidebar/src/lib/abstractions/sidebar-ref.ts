import { ComponentRef, EmbeddedViewRef, TemplateRef, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SidebarInstanceComponent } from '../components/sidebar-instance/sidebar-instance.component';
import { TSidebarContent } from './component-or-template.type';
import { ISidebarConfig } from './interfaces/sidebar-config.interface';
import { ISidebarContainerRef } from './interfaces/sidebar-container-ref.interface';
import { ISidebarRef } from './interfaces/sidebar-ref.interface';

export class SidebarRef<T> implements ISidebarRef<T> {
  private readonly _beforeOpened = new Subject<void>();
  private readonly _afterOpened = new Subject<void>();
  private readonly _beforeClosed = new Subject<any>();
  private readonly _afterClosed = new Subject<any>();

  parentRef?: ISidebarRef<T>;
  componentRef?: ComponentRef<any>;
  embeddedViewRef?: EmbeddedViewRef<any>;

  beforeOpened = () => this._beforeOpened as Observable<void>;
  afterOpened = () => this._afterOpened as Observable<void>;
  beforeClosed = () => this._beforeClosed as Observable<any>;
  afterClosed = () => this._afterClosed as Observable<any>;

  containerRef!: ISidebarContainerRef;
  instanceComponentRef!: ComponentRef<SidebarInstanceComponent>

  private destroyComponent(): void {
    this.componentRef?.destroy?.();
    this.embeddedViewRef?.destroy?.();
    this.instanceComponentRef.destroy();
  }

  close(returnValue?: any): void {
    const childInstance = this.containerRef.instances.find(x => x.parentRef === this);
    if (childInstance) childInstance.close();

    const thisInstanceIdx = this.containerRef.instances.findIndex(x => x === this);
    if (thisInstanceIdx === -1) return;

    this._beforeClosed.next(returnValue);
    this._beforeClosed.complete();

    this.destroyComponent();
    this.containerRef.instances.splice(thisInstanceIdx);

    this._afterClosed.next(returnValue);
    this._afterClosed.complete();
  }

  async openChildAsync<T, D = any>(component: Type<T>, sidebarConfig?: ISidebarConfig<D>): Promise<ISidebarRef<T>>;
  async openChildAsync<T, D = any>(template: TemplateRef<T>, sidebarConfig?: ISidebarConfig<D>): Promise<ISidebarRef<null>>;
  async openChildAsync<T, D = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig: ISidebarConfig<D>  = {}): Promise<ISidebarRef<T | null>> {
    const existingInstanceIdx = this.containerRef.instances.findIndex(x => x.parentRef === this);
    if (existingInstanceIdx !== -1) this.containerRef.instances[existingInstanceIdx].close();

    return await this.containerRef.openAsync(componentOrTemplate, { ...sidebarConfig, parent: this });
  }

}