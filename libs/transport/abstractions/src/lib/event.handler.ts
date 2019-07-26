import { Observable, Subject } from 'rxjs';

export class EventHandler<T> {

  private readonly _message$: Subject<T> = new Subject();

  public get message$(): Observable<T> {
    return this._message$;
  }

  public set message(v: T) {
    this._message$.next(v);
  }

  public dispose(): void {
    this._message$.complete();
  }
}
