import { isNullOrUndefined } from './is-null-or-undefined.helper';
import { isNullOrWhiteSpace } from './is-null-or-whitespace.helper';

declare global {
  interface String {
    isNullOrUndefined(): boolean;

    isNullOrWhiteSpace(): boolean;
  }

  interface Number {
    isNullOrUndefined(): boolean;
  }

  interface Object {
    isNullOrUndefined(value: any): boolean;
  }
}

String.prototype.isNullOrUndefined = () => isNullOrUndefined(this);
String.prototype.isNullOrWhiteSpace = () => isNullOrWhiteSpace(this as unknown as string);

Number.prototype.isNullOrUndefined = () => isNullOrUndefined(this);
Object.prototype.isNullOrUndefined = () => isNullOrUndefined(this);

export {};