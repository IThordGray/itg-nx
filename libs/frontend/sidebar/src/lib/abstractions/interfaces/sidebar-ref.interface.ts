import { ComponentRef, EmbeddedViewRef, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { TSidebarContent } from '../component-or-template.type';
import { ISidebarConfig } from './sidebar-config.interface';
import { ISidebarContainerRef } from './sidebar-container-ref.interface';

export interface ISidebarRef<T = any> {
  containerRef: ISidebarContainerRef;

  parentRef?: ISidebarRef;
  componentRef?: ComponentRef<T> | undefined;
  embeddedViewRef?: EmbeddedViewRef<any> | undefined;

  close(): void;

  openChildAsync<T, D = any>(component: Type<T>, sidebarConfig: ISidebarConfig<D>): Promise<ISidebarRef<T>>;
  openChildAsync<T, D = any>(template: TemplateRef<T>, sidebarConfig: ISidebarConfig<D>): Promise<ISidebarRef<null>>;
  openChildAsync<T, D = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig: ISidebarConfig<D>): Promise<ISidebarRef<T | null>>;

  afterClosed: () => Observable<void>;
  afterOpened: () => Observable<void>;
  beforeOpened: () => Observable<void>;
  beforeClosed: () => Observable<void>;
}