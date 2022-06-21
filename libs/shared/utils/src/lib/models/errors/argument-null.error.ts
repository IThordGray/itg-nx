import { ArgumentError } from './argument.error';

export class ArgumentNullError extends ArgumentError {
  constructor(name: string) {
    super(`Argument [${ name }] cannot be null or empty.`);
  }
}
