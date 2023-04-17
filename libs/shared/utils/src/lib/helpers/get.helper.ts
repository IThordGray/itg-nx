export function get(obj: any, path: string, defaultValue?: any): any {
  const properties = path.split('.');
  let result = obj;
  for (const property of properties) {
    result = result?.[property];
    if (result === undefined) {
      return defaultValue;
    }
  }
  return result;
}
