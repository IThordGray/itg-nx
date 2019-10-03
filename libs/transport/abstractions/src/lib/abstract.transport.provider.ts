import { Observable, Subject } from 'rxjs';

export abstract class TProvider {
  public get onMessage$(): Observable<any> {
    return this._onMessage$;
  }

  public name: string;

  protected _onMessage$: Subject<any> = new Subject();

  public abstract publish(msg: any): void;
}
