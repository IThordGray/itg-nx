import { InvalidOperationError } from '../errors/invalid-operation.error';
import { isEqual } from '../helpers/is-equal.helper';

export class Guid {

    public static empty(): Guid {
        return new Guid('00000000-0000-0000-0000-000000000000');
    }

    public static newGuid(): string {
        return new Guid().toString();
    }

    private _value: string = undefined;

    constructor(value?: string) {
        this._value = this.newGuid(value) || this.newGuid();
    }

    private newGuid(a?: any): string {
        // tslint:disable:no-bitwise
        // @ts-ignore
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, this.newGuid);
    }

    public isEmpty(): boolean {
        return this._value === Guid.empty().toString();
    }

    public equals(to: string | Guid): boolean {
        if (typeof to === 'string') {
            return isEqual(this._value, to);
        }

        if (to instanceof Guid) {
            return isEqual(this._value, to.toString());
        }

        throw new InvalidOperationError(`Can only compare value to 'string' of 'Guid'`);
    }

    public toString(): string {
        return this._value;
    }
}

