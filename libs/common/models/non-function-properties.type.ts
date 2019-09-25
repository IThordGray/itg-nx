import { NonFunctionPropertyNames } from './non-function-property-names.type';

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
