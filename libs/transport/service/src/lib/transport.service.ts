import { Injectable, OnDestroy } from '@angular/core';
import { EventHandler, IRequestMessage, IResponseMessage, TProvider } from '@itg/transport/abstractions';
import { Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, timeout } from 'rxjs/operators';
import { TransportEventBusService } from './transport-event-bus.service';
import { TransportServiceModule } from './transport-service.module';

@Injectable({
  providedIn: TransportServiceModule
})
export class TransportService extends TProvider implements OnDestroy {

  private readonly _onDestroy$: Subject<void> = new Subject();

  private get responseHandler(): EventHandler<IResponseMessage> {
    return this.eventBus.responseHandler;
  }

  private get requestHandler(): EventHandler<IRequestMessage> {
    return this.eventBus.requestHandler;
  }

  public get onMessage$(): Observable<IResponseMessage> {
    return super.onMessage$;
  };

  constructor(
    private eventBus: TransportEventBusService
  ) {
    super();

    this.responseHandler.message$.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(e => {
      this._onMessage$.next(e);
    });
  }

  public ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  public publish(msg: IRequestMessage): void {
    this.requestHandler.message = msg;
  }

  public async transceiveAsync(msg: IRequestMessage): Promise<IResponseMessage> {

    const response: Promise<IResponseMessage> = this.responseHandler.message$.pipe(
      timeout(30000),
      filter(e => e.sourceMessageId === msg.messageId),
      take(1)
    ).toPromise();

    this.publish(msg);

    return await response;
  }

}
