export function isPromise(obj: any): obj is ReturnType<typeof obj> {
  return !!obj && typeof obj.then === 'function';
}
