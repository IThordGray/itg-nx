export function cloneDeep<T>(value: T): T {
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(cloneDeep) as unknown as T;
  }

  const clonedObject = {} as T;

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      clonedObject[key] = cloneDeep(value[key]);
    }
  }

  return clonedObject;
}
