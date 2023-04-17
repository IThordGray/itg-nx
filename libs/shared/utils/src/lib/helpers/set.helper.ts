export function set(obj: any, path: string, value: any): any {
  const properties = path.split('.');
  let currentObj = obj;
  for (let i = 0; i < properties.length - 1; i++) {
    const property = properties[i];
    if (!currentObj[property]) {
      currentObj[property] = {};
    }
    currentObj = currentObj[property];
  }
  currentObj[properties[properties.length - 1]] = value;
  return obj;
}
