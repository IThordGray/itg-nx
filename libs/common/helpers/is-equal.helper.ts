import { isEqual as _isEqual } from 'lodash-es';

export function isEqual(value1: any, value2: any): boolean {
    return _isEqual(value1, value2)
}