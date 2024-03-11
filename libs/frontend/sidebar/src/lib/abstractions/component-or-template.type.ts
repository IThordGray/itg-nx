import { TemplateRef, Type } from '@angular/core';

export type TSidebarContent<TComponent> = Type<TComponent> | TemplateRef<TComponent>;