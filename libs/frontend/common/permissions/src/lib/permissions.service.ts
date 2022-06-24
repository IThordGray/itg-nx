import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PermissionsApi } from './permissions.api';

@Injectable()
export class PermissionsService {
  private readonly _fullAccessPermission: string = 'Shared.FullAccess';
  private readonly _permission$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(
    private permissionsApi: PermissionsApi
  ) {
  }

  load(): void {
    this.permissionsApi.getAll().subscribe(x => this._permission$.next(x));
  }

  hasPermissions(permissions: string[], includeAll: boolean = false): Observable<boolean> {
    return this._permission$.pipe(
      map(validPermissions => {
        return validPermissions.includes(this._fullAccessPermission)
          ? true
          : includeAll
            ? permissions.every(x => validPermissions.includes(x))
            : permissions.some(x => validPermissions.includes(x));
      })
    );
  }
}
