import { Component, inject, Injector, TemplateRef, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { filter, firstValueFrom, ReplaySubject } from 'rxjs';
import { TSidebarContent } from '../../abstractions/component-or-template.type';
import { SIDEBAR_CONFIG, SIDEBAR_CONTAINER_REF, SIDEBAR_DATA } from '../../abstractions/injection-tokens';
import { ISidebarConfig } from '../../abstractions/interfaces/sidebar-config.interface';
import { ISidebarRef } from '../../abstractions/interfaces/sidebar-ref.interface';
import { SidebarContainerRef } from '../../abstractions/sidebar-container-ref';
import { SidebarRef } from '../../abstractions/sidebar-ref';
import { SidebarInstanceComponent } from '../sidebar-instance/sidebar-instance.component';

@Component({
  standalone: true,
  selector: 'itg-sidebar-container',
  templateUrl: 'sidebar-container.component.html',
  styleUrl: 'sidebar-container.component.scss'
})
export class SidebarContainerComponent {

  private readonly _contentContainer$ = new ReplaySubject<ViewContainerRef>(1);
  private readonly _injector = inject(Injector);

  readonly sidebarContainerRef = new SidebarContainerRef(this);
  readonly getContentContainerAsync = () => firstValueFrom(this._contentContainer$.pipe(filter(x => !!x)));

  @ViewChild('contentContainer', { read: ViewContainerRef })
  private set _contentContainer(value: ViewContainerRef) {
    this._contentContainer$.next(value);
  }

  get instances(): ISidebarRef[] { return this.sidebarContainerRef.instances }

  async createSidebarInstanceAsync<T, D = any>(componentOrTemplate: TSidebarContent<T>, config: ISidebarConfig<D> & { parent?: ISidebarRef } = {}): Promise<SidebarRef<T | null>> {
    if (this.instances.length && !config?.parent) this.instances[0]?.close();

    const injector = Injector.create({
      parent: this._injector,
      providers: [
        { provide: SIDEBAR_CONTAINER_REF, useValue: this.sidebarContainerRef },
        { provide: SIDEBAR_CONFIG, useValue: config },
        { provide: SIDEBAR_DATA, useValue: config?.data }
      ]
    });

    const sidebarInstanceComponentRef = (await this.getContentContainerAsync()).createComponent(SidebarInstanceComponent, { injector });
    const sidebarRef = sidebarInstanceComponentRef.instance.sidebarRef as SidebarRef<T>;
    sidebarRef.instanceComponentRef = sidebarInstanceComponentRef;
    sidebarRef.parentRef = config.parent;

    (sidebarRef as any)._beforeOpened.next();
    (sidebarRef as any)._beforeOpened.complete();

    await Promise.all([
      sidebarRef.instanceComponentRef.instance.createHeaderComponentAsync(),
      sidebarRef.instanceComponentRef.instance.createComponentAsync(componentOrTemplate)
    ]);

    setTimeout(() => {
      (sidebarRef as any)._afterOpened.next();
      (sidebarRef as any)._afterOpened.complete();
    }, 0);


    this.instances.push(sidebarRef);

    return sidebarRef;
  }
}