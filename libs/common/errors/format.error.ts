import { BaseError } from './base.error';

export class FormatError extends BaseError {
  constructor(message: string) {
    const trueProto: any = new.target.prototype;
    super(message);
    this.__proto__ = trueProto;
  }
}
