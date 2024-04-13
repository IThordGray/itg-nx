import { IFormatProvider } from './format-provider.interface';

export interface IFormattable {
  toString(format?: string, formatProvider?: IFormatProvider): string;
}