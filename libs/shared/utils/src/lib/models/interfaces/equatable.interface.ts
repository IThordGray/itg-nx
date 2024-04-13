export interface IEquatableStatic<T = any> {
  equals(obj1: T, obj2: T): boolean;
}

export interface IEquatable<T = any> {
  equals(obj: T): boolean;
}