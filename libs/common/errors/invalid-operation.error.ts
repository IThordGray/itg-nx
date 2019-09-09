import { BaseError } from './base.error';

export class InvalidOperationError extends BaseError {
  constructor(msg: string) {
    const trueProto: any = new.target.prototype;
    super(msg);

    this.__proto__ = trueProto;
  }
}
