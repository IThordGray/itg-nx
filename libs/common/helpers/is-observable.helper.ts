import { Observable } from 'rxjs';

export function isObservable(obj: any): obj is Observable<any> {
  return !!obj && obj instanceof Observable;
}
