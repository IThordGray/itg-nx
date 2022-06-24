import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PermissionsService } from './permissions.service';

@Directive({ selector: '[hasPermissions]' })
export class PermissionsDirective implements OnDestroy {

  private readonly _onDestroy$ = new Subject<void>();
  private readonly _hasPermissionsAll$ = new BehaviorSubject(false);

  private _displayingTemplate = false;

  @Input() set hasPermissionsIncludeAll(value: boolean) {
    this._hasPermissionsAll$.next(value);
  }

  @Input() set hasPermissions(permissions: string[]) {
    this.checkPermissions(permissions);
  }

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private _permissionsService: PermissionsService
  ) {
  }

  checkPermissions(permissions: string[]): void {
    this._hasPermissionsAll$.pipe(
      switchMap(includeAll => this._permissionsService.hasPermissions(permissions, includeAll))
    ).subscribe(hasPermission => {
      if (hasPermission && !this._displayingTemplate) {
        this._viewContainer.createEmbeddedView(this._templateRef);
        this._displayingTemplate = true;
        return;
      }

      if (!hasPermission && this._displayingTemplate) {
        this._viewContainer.clear();
        this._displayingTemplate = false;
        return;
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
