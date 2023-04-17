import { ArgumentNullError } from '../errors/argument-null.error';
import { InvalidOperationError } from '../errors/invalid-operation.error';
import { Guard } from './guard.utils';

describe('Guard', () => {
  describe('againstNullArgument', () => {
    it('should not throw an error when the argument is not null or undefined', () => {
      expect(() => Guard.againstNullArgument('hello', 'name')).not.toThrow();
    });

    it('should throw an ArgumentNullError when the argument is null', () => {
      expect(() => Guard.againstNullArgument(null, 'name')).toThrow(ArgumentNullError);
    });

    it('should throw an ArgumentNullError when the argument is undefined', () => {
      expect(() => Guard.againstNullArgument(undefined, 'name')).toThrow(ArgumentNullError);
    });

    it('should include the argument name in the error message', () => {
      expect(() => Guard.againstNullArgument(null, 'name')).toThrowError('Argument [name] cannot be null or empty.');
    });
  });

  describe('againstNullOrEmpty', () => {
    it('should not throw an error when the argument is not null or empty', () => {
      expect(() => Guard.againstNullOrEmpty('hello', 'name')).not.toThrow();
      expect(() => Guard.againstNullOrEmpty([ 1, 2, 3 ], 'name')).not.toThrow();
      expect(() => Guard.againstNullOrEmpty({ a: 1 }, 'name')).not.toThrow();
    });

    it('should throw an InvalidOperationError when the argument is null', () => {
      expect(() => Guard.againstNullOrEmpty(null, 'name')).toThrow(InvalidOperationError);
    });

    it('should throw an InvalidOperationError when the argument is undefined', () => {
      expect(() => Guard.againstNullOrEmpty(undefined, 'name')).toThrow(InvalidOperationError);
    });

    it('should throw an InvalidOperationError when the argument is an empty string', () => {
      expect(() => Guard.againstNullOrEmpty('', 'name')).toThrow(InvalidOperationError);
    });

    it('should throw an InvalidOperationError when the argument is an empty array', () => {
      expect(() => Guard.againstNullOrEmpty([], 'name')).toThrow(InvalidOperationError);
    });

    it('should throw an InvalidOperationError when the argument is an empty object', () => {
      expect(() => Guard.againstNullOrEmpty({}, 'name')).toThrow(InvalidOperationError);
    });

    it('should include the argument name in the error message', () => {
      expect(() => Guard.againstNullOrEmpty(null, 'name')).toThrowError('Operation not valid: "name" cannot be null or empty.');
    });
  });
});
