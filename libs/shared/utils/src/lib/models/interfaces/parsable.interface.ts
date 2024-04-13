import { IFormatProvider } from './format-provider.interface';

export interface IParsableStatic<T> {
  parse(value: string, formatProvider?: IFormatProvider): T;
  tryParse(value: string, formatProvider?: IFormatProvider): T | undefined;
}