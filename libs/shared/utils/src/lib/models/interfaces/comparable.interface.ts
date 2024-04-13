export interface IComparableStatic<T = any> {
  compare(obj1: T, obj2: T): -1 | 0 | 1;
}

export interface IComparable<T = any> {
  compareTo(obj: T): -1 | 0 | 1;
}