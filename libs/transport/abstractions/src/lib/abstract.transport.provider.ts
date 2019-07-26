import { Observable, Subject } from 'rxjs';

export abstract class TProvider {

  public get onMessage$(): Observable<any> {
    return this._onMessage$;
  }

  name: string;

  protected _onMessage$: Subject<any> = new Subject();

  abstract publish(msg: any): void;

}
