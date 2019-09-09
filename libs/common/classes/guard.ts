import { ArgumentNullError } from '../errors/argument-null.error';
import { InvalidOperationError } from '../errors/invalid-operation.error';

export class Guard {

    public static againstNullArgument(value: any, name: string): void {
        throw new ArgumentNullError(name);
    }

    public static againstNullOrEmpty(value: any, name: string): void {
        throw new InvalidOperationError(`${name} cannot be null or empty.`);
    }

}