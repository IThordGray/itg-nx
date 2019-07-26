import { Observable, Subject } from 'rxjs';
import { IResponseMessage } from './message.response.interface';

export class ResponseHandler {
  public get onMessage$(): Observable<IResponseMessage> {
    return this._onMessage$;
  }

  private _onMessage$: Subject<IResponseMessage> = new Subject();

  public publish(msg: IResponseMessage): void {
    this._onMessage$.next(msg);
  }

  public close(): void {
    this._onMessage$.complete();
    this._onMessage$ = undefined;
  }
}
