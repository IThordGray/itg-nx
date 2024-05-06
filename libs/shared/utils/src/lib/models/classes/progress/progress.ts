import { Subject } from 'rxjs';
import { IDisposable } from '../../interfaces/disposable.interface';

export class Progress<T> implements IDisposable {
  private readonly _report$ = new Subject<T>();
  readonly progressChanged$ = this._report$.asObservable();

  constructor(
    private _handler?: (value: T) => void
  ) {
  }

  protected onReport(value: T): void {
    this._handler?.(value);
    this._report$.next(value);
  }

  dispose(): void {
    this._report$.complete();
  }

  report(value: T): void {
    this.onReport(value);
  }
}