import { ArgumentError } from './argument.error';

export class ArgumentNullError extends ArgumentError {
  constructor(name: string) {
    const trueProto: any = new.target.prototype;
    super('Argument [' + name + '] cannot be null or empty.');

    this.__proto__ = trueProto;
  }
}
