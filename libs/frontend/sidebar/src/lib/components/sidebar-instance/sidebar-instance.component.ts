import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  HostBinding,
  inject,
  Injector,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { filter, firstValueFrom, Observable, ReplaySubject, Subject } from 'rxjs';
import { TSidebarContent } from '../../abstractions/component-or-template.type';
import {
  SIDEBAR_CONFIG,
  SIDEBAR_CONTAINER_REF,
  SIDEBAR_DATA,
  SIDEBAR_PARENT_REF,
  SIDEBAR_REF
} from '../../abstractions/injection-tokens';
import { ISidebarConfig } from '../../abstractions/interfaces/sidebar-config.interface';
import { ISidebarContainerConfig } from '../../abstractions/interfaces/sidebar-container-config.interface';
import { ISidebarRef } from '../../abstractions/interfaces/sidebar-ref.interface';
import { DefaultHeaderComponent } from '../sidebar-default-header/default-header.component';

@Component({
  standalone: true,
  selector: 'sidebar-instance',
  templateUrl: 'sidebar-instance.component.html',
  styleUrl: 'sidebar-instance.component.scss'
})

export class SidebarInstanceComponent implements ISidebarRef {
  private readonly _injector = inject(Injector);
  private readonly _sidebarContainerRef = inject(SIDEBAR_CONTAINER_REF);
  private readonly _sidebarConfig = inject(SIDEBAR_CONFIG);
  private readonly _containerRef = inject(SIDEBAR_CONTAINER_REF);
  private readonly _parentRef = inject(SIDEBAR_PARENT_REF);

  private readonly _beforeOpened$ = new Subject<void>();
  private readonly _afterOpened$ = new Subject<void>();
  private readonly _beforeClosed$ = new Subject<any>();
  private readonly _afterClosed$ = new Subject<any>();

  private readonly _contentContainer$ = new ReplaySubject<ViewContainerRef>(1);
  private readonly _headerContainer$ = new ReplaySubject<ViewContainerRef>(1);

  private readonly getContentContainerRefAsync = () => firstValueFrom(this._contentContainer$.pipe(filter(x => !!x)));
  private readonly getHeaderContainerRefAsync = () => firstValueFrom(this._headerContainer$.pipe(filter(x => !!x)));

  private _headerEmbeddedViewRef?: EmbeddedViewRef<any>;
  private _headerComponentRef?: ComponentRef<any>;
  componentRef?: ComponentRef<any> | undefined;
  embeddedViewRef?: EmbeddedViewRef<any> | undefined;

  @ViewChild('contentContainer', { read: ViewContainerRef })
  private set _contentContainer(value: ViewContainerRef) {
    this._contentContainer$.next(value);
  }

  @ViewChild('headerContainer', { read: ViewContainerRef })
  private set _headerContainer(value: ViewContainerRef) {
    this._headerContainer$.next(value);
  }

  get containerRef() {
    return this._containerRef;
  }

  get parentRef() {
    return this._parentRef;
  }

  @HostBinding('class.border-end') get isNotLast() {
    return this._sidebarContainerRef.instances[0]?.componentRef?.instance !== this;
  }

  private async createEmbeddedViewRefAsync(templateRef: TemplateRef<any>): Promise<void> {
    const context: any = { $implicit: this._sidebarConfig.data, sidebarRef: this };

    this.embeddedViewRef = (await this.getContentContainerRefAsync()).createEmbeddedView(templateRef, context);
  }

  private getInjector(): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        { provide: SIDEBAR_REF, useValue: this },
        { provide: SIDEBAR_DATA, useValue: this._sidebarConfig.data }
      ]
    });
  }

  private async createComponentRefAsync(componentType: Type<any>): Promise<void> {
    const injector = this.getInjector();
    this.componentRef = (await this.getContentContainerRefAsync()).createComponent(componentType, { injector });
  }

  private async createEmbeddedViewRefHeaderAsync(): Promise<void> {
    const context: any = { $implicit: this._sidebarConfig.data, sidebarRef: this };
    this._headerEmbeddedViewRef = (await this.getHeaderContainerRefAsync()).createEmbeddedView(this._sidebarConfig.heading as TemplateRef<any>, context);
  }

  private async createComponentRefHeaderAsync(): Promise<void> {
    const injector = this.getInjector();
    this._headerComponentRef = (await this.getHeaderContainerRefAsync()).createComponent(DefaultHeaderComponent, { injector });
  }

  afterClosed(): Observable<any> {
    return this._afterClosed$;
  }

  afterOpened(): Observable<void> {
    return this._afterOpened$;
  }

  beforeClosed(): Observable<any> {
    return this._beforeClosed$;
  }

  beforeOpened(): Observable<void> {
    return this._beforeOpened$;
  }

  close(returnValue?: any): void {
    const childInstance = this.containerRef.instances.find(x => x.parentRef === this);
    if (childInstance) childInstance.close();

    const thisInstanceIdx = this.containerRef.instances.findIndex(x => x === this);
    if (thisInstanceIdx === -1) return;

    this._beforeClosed$.next(returnValue);
    this._beforeClosed$.complete();

    this.dispose();
    this.containerRef.instances.splice(thisInstanceIdx);

    this._afterClosed$.next(returnValue);
    this._afterClosed$.complete();
  }

  async createComponentAsync<T>(componentOrTemplate: TSidebarContent<T>): Promise<void> {
    componentOrTemplate instanceof TemplateRef
      ? await this.createEmbeddedViewRefAsync(componentOrTemplate)
      : await this.createComponentRefAsync(componentOrTemplate);
  }

  async createHeaderComponentAsync(): Promise<void> {
    this._sidebarConfig.heading instanceof TemplateRef
      ? await this.createEmbeddedViewRefHeaderAsync()
      : await this.createComponentRefHeaderAsync();
  }

  async destroyDefaultHeader(): Promise<void> {
    await this.getHeaderContainerRefAsync();

    this._headerComponentRef?.destroy?.();
    this._headerEmbeddedViewRef?.destroy?.();
  }

  dispose(): void {
    this.componentRef?.destroy?.();
    this.embeddedViewRef?.destroy?.();
  }

  async openChildAsync<T, D = any, R = any>(component: Type<T>, sidebarConfig: ISidebarConfig<D>): Promise<ISidebarRef<T, R>>;
  async openChildAsync<T, D = any, R = any>(template: TemplateRef<T>, sidebarConfig: ISidebarConfig<D>): Promise<ISidebarRef<null, R>>;
  async openChildAsync<T, D = any, R = any>(componentOrTemplate: TSidebarContent<T>, sidebarConfig: ISidebarConfig<D>): Promise<ISidebarRef<T | null, R>> {
    const existingChild = this.containerRef.instances.find(x => x.parentRef === this);
    if (existingChild) existingChild.close();

    const sidebarContainerConfig: ISidebarContainerConfig<D> = { ...sidebarConfig, parent: this };
    return await this.containerRef.openAsync(componentOrTemplate, sidebarContainerConfig);
  }
}