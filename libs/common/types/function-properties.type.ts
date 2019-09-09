import { FunctionPropertyNames } from './function-property-names.type';

export type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
