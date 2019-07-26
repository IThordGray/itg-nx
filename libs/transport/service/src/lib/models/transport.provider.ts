import { EventHandler, IRequestMessage, IResponseMessage, TProvider } from '@itg/transport/abstractions';
import { TransportEventBusService } from '@itg/transport/service';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

interface ITransportProviderOptions {
  filteredTypes?: string[];
}

export abstract class TransportProvider extends TProvider {

  private readonly _onDestroy$: Subject<any> = new Subject();

  protected _onMessage$: Subject<IResponseMessage> = new Subject();

  private options: ITransportProviderOptions = {};

  public eventBus: TransportEventBusService = undefined;

  public get onMessage$(): Observable<IResponseMessage> {
    return super.onMessage$;
  };

  protected get requestHandler(): EventHandler<IRequestMessage> {
    return this.eventBus.requestHandler;
  }

  protected get responseHandler(): EventHandler<IResponseMessage> {
    return this.eventBus.responseHandler;
  }

  protected constructor() {
    super();
  }

  public abstract publish(msg: IRequestMessage): void;

  public addMessageFilters(list: string[]): this {
    this.options.filteredTypes = [...list];
    return this;
  }

  public async startAsync(initCb: (() => void) | (() => Promise<void>) = Promise.resolve): Promise<void> {
    await initCb();

    this.requestHandler.message$.pipe(
      takeUntil(this._onDestroy$),
      filter(e => this.options.filteredTypes && this.options.filteredTypes.length > 0 ? this.options.filteredTypes.includes(e.messageType) : true)
    ).subscribe(e => {
      this.publish(e);
    });

    this._onMessage$.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(e => {
      this.responseHandler.message = e;
    });
  }

  public async stopAsync(cleanupCb: (() => void) | (() => Promise<void>) = Promise.resolve): Promise<void> {
    this._onDestroy$.next();
    await cleanupCb();
  }

}
