import { InjectionToken } from '@angular/core';
import { ISidebarConfig } from './interfaces/sidebar-config.interface';
import { ISidebarContainerRef } from './interfaces/sidebar-container-ref.interface';
import { ISidebarRef } from './interfaces/sidebar-ref.interface';

export const SIDEBAR_PARENT_REF = new InjectionToken<ISidebarRef>('Parent sidebar ref')

export const SIDEBAR_CONTAINER_REF = new InjectionToken<ISidebarContainerRef>('Sidebar container ref');

export const SIDEBAR_REF = new InjectionToken<ISidebarRef>('Sidebar instance ref');

export const SIDEBAR_CONFIG = new InjectionToken<ISidebarConfig>('Sidebar config ', { factory: () => ({ }) });

export const SIDEBAR_DATA = new InjectionToken<any>('Sidebar data', { factory: () => ({ }) });


