import { InjectionToken } from '@angular/core';
import { ISidebarConfig } from './interfaces/sidebar-config.interface';
import { ISidebarContainerRef } from './interfaces/sidebar-container-ref.interface';
import { SidebarRef } from './sidebar-ref';

export const SIDEBAR_CONFIG = new InjectionToken<ISidebarConfig<any>>('Sidebar config ', { factory: () => ({ }) });

export const SIDEBAR_DATA = new InjectionToken<any>('Sidebar data', { factory: () => ({ }) });

export const SIDEBAR_REF = new InjectionToken<SidebarRef<any>>('Sidebar instance ref');

export const SIDEBAR_CONTAINER_REF = new InjectionToken<ISidebarContainerRef>('Sidebar container ref');