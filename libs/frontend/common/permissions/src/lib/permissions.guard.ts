import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionsService } from './permissions.service';

@Injectable()
export class PermissionsGuard  {
  constructor(
    private _permissionsService: PermissionsService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._permissionsService.hasPermissions(route.data['permissions']);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Observable<boolean> {
    return this._permissionsService.hasPermissions(childRoute.data['permissions']);
  }

  canLoad(route: Route): Observable<boolean> {
    return this._permissionsService.hasPermissions(route.data?.['permissions']);
  }

}
