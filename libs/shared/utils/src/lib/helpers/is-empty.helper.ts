export function isEmpty(value: any): boolean {
  if (value == null) return true;

  if (
    Array.isArray(value) ||
    typeof value === 'string' ||
    typeof value.splice === 'function' ||
    isBuffer(value) ||
    isTypedArray(value) ||
    isArguments(value) ||
    isArrayLike(value)
  ) {
    return !value.length;
  }

  if (isObjectLike(value)) {
    const tag = getTag(value);

    if (tag == mapTag || tag == setTag) return !value.size;

    if (isPrototype(value)) return !baseKeys(value).length;

    for (const key in value) {
      if (hasOwnProperty.call(value, key)) return false;
    }

    return true;
  }
  return false;
}

export function isBuffer(value: any): boolean {
  return value != null && value.constructor != null && typeof value.constructor.isBuffer === 'function' && value.constructor.isBuffer(value);
}

export function isTypedArray(value: any): boolean {
  const tag = getTag(value);
  return tag == typedArrayTag || tag == float32Tag || tag == float64Tag || tag == int8Tag || tag == int16Tag || tag == int32Tag || tag == uint8Tag || tag == uint8ClampedTag || tag == uint16Tag || tag == uint32Tag;
}

export function isArguments(value: any): boolean {
  return typeof value === 'object' && value !== null && Object.prototype.hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

export function isObjectLike(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

export function isArrayLike(value: any): boolean {
  return typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'length');
}

export function getTag(value: any): string {
  return Object.prototype.toString.call(value);
}

export function isPrototype(value: any): boolean {
  const Ctor = value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return value === proto;
}

export function baseKeys(object: any): string[] {
  if (!isPrototype(object)) {
    return Object.keys(object);
  }
  const result = [];
  for (const key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key !== 'constructor') {
      result.push(key);
    }
  }
  return result;
}

export const mapTag = '[object Map]';
export const setTag = '[object Set]';
export const typedArrayTag = '[object Uint8Array]';
export const float32Tag = '[object Float32Array]';
export const float64Tag = '[object Float64Array]';
export const int8Tag = '[object Int8Array]';
export const int16Tag = '[object Int16Array]';
export const int32Tag = '[object Int32Array]';
export const uint8Tag = '[object Uint8Array]';
export const uint8ClampedTag = '[object Uint8ClampedArray]';
export const uint16Tag = '[object Uint16Array]';
export const uint32Tag = '[object Uint32Array]';

export const hasOwnProperty = Object.prototype.hasOwnProperty;
export const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
