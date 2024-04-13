import { TemplateRef } from '@angular/core';

export interface ISidebarConfig<D = any>  {
  heading?: string | TemplateRef<any>;
  subheading?: string;
  data?: D;
}