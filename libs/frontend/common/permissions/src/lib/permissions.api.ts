import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class PermissionsApi {

  getAll(): Observable<string[]> {
    return of([]);
  }

}
