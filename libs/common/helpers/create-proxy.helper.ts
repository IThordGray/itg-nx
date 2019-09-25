import { Guard } from '../classes/guard';

export function createProxy<T, U>(from: T, fromProperty: keyof T, to: U, toProperty: keyof U): void {
    Guard.againstNullArgument(from, 'from');
    Guard.againstNullArgument(fromProperty, 'fromProperty');
    Guard.againstNullArgument(to, 'to');
    Guard.againstNullArgument(toProperty, 'toProperty');


    Object.defineProperty(to, toProperty, {
        get() {
            return from[fromProperty];
        },
        set(v: any) {
            from[fromProperty] = v;
        }
    });
}