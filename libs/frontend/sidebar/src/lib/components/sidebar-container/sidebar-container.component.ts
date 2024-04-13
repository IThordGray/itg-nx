import { Component, inject, Injector, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { filter, firstValueFrom, ReplaySubject } from 'rxjs';
import { TSidebarContent } from '../../abstractions/component-or-template.type';
import { SIDEBAR_CONTAINER_REF, SIDEBAR_PARENT_REF } from '../../abstractions/injection-tokens';
import { ISidebarContainerConfig } from '../../abstractions/interfaces/sidebar-container-config.interface';
import { ISidebarContainerRef } from '../../abstractions/interfaces/sidebar-container-ref.interface';
import { ISidebarRef } from '../../abstractions/interfaces/sidebar-ref.interface';
import { SidebarInstanceComponent } from '../sidebar-instance/sidebar-instance.component';

@Component({
  standalone: true,
  selector: 'itg-sidebar-container',
  templateUrl: 'sidebar-container.component.html',
  styleUrl: 'sidebar-container.component.scss'
})
export class SidebarContainerComponent implements ISidebarContainerRef {
  private readonly _contentContainer$ = new ReplaySubject<ViewContainerRef>(1);
  private readonly _injector = inject(Injector);

  instances: ISidebarRef[] = [];

  readonly getContentContainerAsync = () => firstValueFrom(this._contentContainer$.pipe(filter(x => !!x)));

  @ViewChild('contentContainer', { read: ViewContainerRef })
  private set _contentContainer(value: ViewContainerRef) {
    this._contentContainer$.next(value);
  }

  async openAsync<T, D = any, R = any>(component: Type<T>, sidebarConfig: ISidebarContainerConfig<D>): Promise<ISidebarRef<T, R>>;
  async openAsync<T, D = any, R = any>(template: TemplateRef<T>, sidebarConfig: ISidebarContainerConfig<D>): Promise<ISidebarRef<null, R>>;
  async openAsync<T, D = any, R = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig: ISidebarContainerConfig<D>): Promise<ISidebarRef<T | null, R>> {
    if (this.instances.length && !sidebarConfig.parent) this.instances[0].close();

    const injector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: SIDEBAR_CONTAINER_REF, useValue: this },
        { provide: SIDEBAR_PARENT_REF, useValue: sidebarConfig.parent }
      ]
    });

    const sidebarInstanceComponentRef = (await this.getContentContainerAsync()).createComponent(SidebarInstanceComponent, { injector });

    sidebarInstanceComponentRef.instance.afterClosed().subscribe(() => sidebarInstanceComponentRef.destroy());

    (sidebarInstanceComponentRef.instance as any)._beforeOpened$.next();
    (sidebarInstanceComponentRef.instance as any)._beforeOpened$.complete();

    await Promise.all([
      sidebarInstanceComponentRef.instance.createHeaderComponentAsync(),
      sidebarInstanceComponentRef.instance.createComponentAsync(componentOrTemplate)
    ]);

    setTimeout(() => {
      (sidebarInstanceComponentRef.instance as any)._afterOpened$.next();
      (sidebarInstanceComponentRef.instance as any)._afterOpened$.complete();
    }, 0);

    this.instances.push(sidebarInstanceComponentRef.instance);

    return sidebarInstanceComponentRef.instance;
  }
}