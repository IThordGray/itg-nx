import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PermissionsService } from './permissions.service';

@Pipe({ name: 'hasPermissionsAsync' })
export class PermissionsPipe implements PipeTransform, OnDestroy {

  private readonly _onDestroy$ = new Subject<void>();

  constructor(
    private _permissionsService: PermissionsService
  ) { }

  transform(permissions: string[], includeAll: boolean = false): Observable<boolean> {
    return this.checkPermissions(permissions, includeAll);
  }

  checkPermissions(permissions: string[], includeAll: boolean): Observable<boolean> {
    return this._permissionsService.hasPermissions(permissions, includeAll).pipe(
      takeUntil(this._onDestroy$)
    );
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

}
