import {
  Component,
  ComponentRef,
  EmbeddedViewRef,
  inject,
  Injector,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { filter, firstValueFrom, ReplaySubject } from 'rxjs';
import { TSidebarContent } from '../../abstractions/component-or-template.type';
import { SIDEBAR_CONFIG, SIDEBAR_CONTAINER_REF, SIDEBAR_DATA, SIDEBAR_REF } from '../../abstractions/injection-tokens';
import { SidebarContainerRef } from '../../abstractions/sidebar-container-ref';
import { SidebarRef } from '../../abstractions/sidebar-ref';
import { DefaultHeaderComponent } from '../sidebar-default-header/default-header.component';

@Component({
  standalone: true,
  selector: 'sidebar-instance',
  templateUrl: 'sidebar-instance.component.html',
  styleUrl: 'sidebar-instance.component.scss'
})

export class SidebarInstanceComponent {
  private readonly _injector = inject(Injector);

  private readonly _sidebarContainerRef = inject<SidebarContainerRef>(SIDEBAR_CONTAINER_REF);
  private readonly _sidebarConfig = inject(SIDEBAR_CONFIG);

  private readonly _contentContainer$ = new ReplaySubject<ViewContainerRef>(1);
  private readonly _headerContainer$ = new ReplaySubject<ViewContainerRef>(1);

  private readonly getContentContainerRefAsync = () => firstValueFrom(this._contentContainer$.pipe(filter(x => !!x)));
  private readonly getHeaderContainerRefAsync = () => firstValueFrom(this._headerContainer$.pipe(filter(x => !!x)));

  private _headerEmbeddedViewRef?: EmbeddedViewRef<any>;
  private _headerComponentRef?: ComponentRef<any>;

  readonly sidebarRef: SidebarRef<any>;

  @ViewChild('contentContainer', { read: ViewContainerRef })
  private set _contentContainer(value: ViewContainerRef) {
    this._contentContainer$.next(value);
  }

  @ViewChild('headerContainer', { read: ViewContainerRef })
  private set _headerContainer(value: ViewContainerRef) {
    this._headerContainer$.next(value);
  }

  get containerRef(): SidebarContainerRef {
    return this._sidebarContainerRef;
  }

  constructor() {
    this.sidebarRef = new SidebarRef();
    this.sidebarRef.containerRef = this._sidebarContainerRef;
  }

  private async createEmbeddedViewRefAsync(templateRef: TemplateRef<any>): Promise<void> {
    const context: any = { $implicit: this._sidebarConfig.data, sidebarRef: this.sidebarRef };

    this.sidebarRef.embeddedViewRef = (await this.getContentContainerRefAsync()).createEmbeddedView(templateRef, context);
  }

  private getInjector(): Injector {
    return Injector.create({
      parent: this._injector,
      providers: [
        { provide: SIDEBAR_CONTAINER_REF, useValue: this._sidebarContainerRef },
        { provide: SIDEBAR_REF, useValue: this.sidebarRef },
        { provide: SIDEBAR_DATA, useValue: this._sidebarConfig.data }
      ]
    });
  }

  private async createComponentRefAsync(componentType: Type<any>): Promise<void> {
    const injector = this.getInjector();
    this.sidebarRef.componentRef = (await this.getContentContainerRefAsync()).createComponent(componentType, { injector });
  }

  private async createEmbeddedViewRefHeaderAsync(): Promise<void> {
    const context: any = { $implicit: this._sidebarConfig.data, sidebarRef: this.sidebarRef };
    this._headerEmbeddedViewRef = (await this.getHeaderContainerRefAsync()).createEmbeddedView(this._sidebarConfig.heading as TemplateRef<any>, context);
  }

  private async createComponentRefHeaderAsync(): Promise<void> {
    const injector = this.getInjector();
    this._headerComponentRef = (await this.getHeaderContainerRefAsync()).createComponent(DefaultHeaderComponent, { injector });
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
}