import { EventHandler, IRequestMessage, IResponseMessage, TProvider } from '@itg/transport/abstractions';
import { TransportEventBusService } from '@itg/transport/service';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Dictionary } from '@itg/common';

interface ITransportProviderOptions {
  filteredTypes?: Dictionary<boolean>;
}

export abstract class TransportProvider extends TProvider {

  protected readonly _onDestroy$: Subject<any> = new Subject();
  protected readonly _options: ITransportProviderOptions = {};

  protected _onMessage$: Subject<IResponseMessage> = new Subject();

  public eventBus: TransportEventBusService = undefined;

  public get onMessage$(): Observable<IResponseMessage> {
    return this._onMessage$;
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

  private filterMessagesByType(e: IRequestMessage): boolean {

    if (!this._options.filteredTypes) {
      return true;
    }

    const messageType = e.messageType ? e.messageType.toUpperCase() : '';

    return !!this._options.filteredTypes[messageType];
  }

  public abstract publish(msg: IRequestMessage): void;

  public registerMessageFilters(list: string[] = []): this {

    this._options.filteredTypes = this._options.filteredTypes || {};

    list.forEach(x => {
      this._options.filteredTypes[x.toUpperCase()] = true;
    });

    return this;
  }

  protected async _startAsync(): Promise<void> {

    this.requestHandler.message$.pipe(
      takeUntil(this._onDestroy$),
      filter(e => this.filterMessagesByType(e))
    ).subscribe(e => {
      this.publish(e);
    });

    this._onMessage$.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe(e => {
      this.responseHandler.message = e;
    });
  }

  protected async _stopAsync(): Promise<void> {
    this._onDestroy$.next();
  }

}
