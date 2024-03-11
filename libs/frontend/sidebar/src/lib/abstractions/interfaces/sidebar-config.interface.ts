import { TemplateRef } from '@angular/core';
import { ISidebarRef } from './sidebar-ref.interface';

export interface ISidebarConfig<D> {
  heading?: string | TemplateRef<any>;
  data?: D;
}