import { Observable, Subject } from 'rxjs';
import { IRequestMessage } from './message.request.interface';

export class RequestHandler {
  public get message$(): Observable<IRequestMessage> {
    return this._message$;
  }

  private _message$: Subject<IRequestMessage> = new Subject();

  public publish(msg: IRequestMessage): void {
    this._message$.next(msg);
  }

  public close(): void {
    this._message$.complete();
    this._message$ = undefined;
  }
}
