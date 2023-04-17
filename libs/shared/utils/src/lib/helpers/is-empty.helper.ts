export function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' || isBuffer(value) || isTypedArray(value) || isArguments(value)) {
    return !value.length;
  }
  if (isObjectLike(value)) {
    const tag = getTag(value);
    if (tag == mapTag || tag == setTag) {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !baseKeys(value).length;
    }
    for (const key in value) {
      if (hasOwnProperty.call(value, key)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function isBuffer(value: any): boolean {
  return value != null && value.constructor != null && typeof value.constructor.isBuffer === 'function' && value.constructor.isBuffer(value);
}

function isTypedArray(value: any): boolean {
  const tag = getTag(value);
  return tag == typedArrayTag || tag == float32Tag || tag == float64Tag || tag == int8Tag || tag == int16Tag || tag == int32Tag || tag == uint8Tag || tag == uint8ClampedTag || tag == uint16Tag || tag == uint32Tag;
}

function isArguments(value: any): boolean {
  return typeof value === 'object' && value !== null && Object.prototype.hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

function isObjectLike(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function getTag(value: any): string {
  return Object.prototype.toString.call(value);
}

function isPrototype(value: any): boolean {
  const Ctor = value.constructor;
  const proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype;
  return value === proto;
}

function baseKeys(object: any): string[] {
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

const mapTag = '[object Map]';
const setTag = '[object Set]';
const typedArrayTag = '[object Uint8Array]';
const float32Tag = '[object Float32Array]';
const float64Tag = '[object Float64Array]';
const int8Tag = '[object Int8Array]';
const int16Tag = '[object Int16Array]';
const int32Tag = '[object Int32Array]';
const uint8Tag = '[object Uint8Array]';
const uint8ClampedTag = '[object Uint8ClampedArray]';
const uint16Tag = '[object Uint16Array]';
const uint32Tag = '[object Uint32Array]';

const hasOwnProperty = Object.prototype.hasOwnProperty;
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
