import { ComponentRef, EmbeddedViewRef, TemplateRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { TSidebarContent } from '../component-or-template.type';
import { ISidebarConfig } from './sidebar-config.interface';
import { ISidebarContainerRef } from './sidebar-container-ref.interface';

export interface ISidebarRef<T = any, R = any> {
  containerRef: ISidebarContainerRef;

  parentRef?: ISidebarRef;
  componentRef?: ComponentRef<T> | undefined;
  embeddedViewRef?: EmbeddedViewRef<any> | undefined;

  afterClosed(): Observable<R>;
  afterOpened(): Observable<void>;
  beforeClosed(): Observable<R>;
  beforeOpened(): Observable<void>;
  close(returnValue?: R): void;

  openChildAsync<T, D = any, R = any>(component: Type<T>, sidebarConfig?: ISidebarConfig<D>): Promise<ISidebarRef<T, R>>;
  openChildAsync<T, D = any, R = any>(template: TemplateRef<T>, sidebarConfig?: ISidebarConfig<D>): Promise<ISidebarRef<null, R>>;
  openChildAsync<T, D = any, R = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig?: ISidebarConfig<D>): Promise<ISidebarRef<T | null, R>>;
}