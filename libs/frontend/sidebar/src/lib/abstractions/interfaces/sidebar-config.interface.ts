import { TemplateRef } from '@angular/core';

export interface ISidebarConfig<D>  {
  heading?: string | TemplateRef<any>;
  subheading?: string;
  data?: D;
}