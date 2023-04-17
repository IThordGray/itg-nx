import { InvalidOperationError } from '../models/errors/invalid-operation.error';
import { isWhiteSpace } from './is-white-space.helper';

describe('isWhiteSpace', () => {
  it('should return true for a string that contains only whitespace characters', () => {
    expect(isWhiteSpace('   \n\t  \r   ')).toBe(true);
  });

  it('should return false for a string that contains non-whitespace characters', () => {
    expect(isWhiteSpace('hello')).toBe(false);
  });

  it('should throw an error for a non-string input', () => {
    expect(() => isWhiteSpace(123)).toThrow(InvalidOperationError);
  });

  it('should include the correct error message when called with a non-string input', () => {
    expect(() => isWhiteSpace(123)).toThrowError(`Cannot check value for whitespace. Value is not of type 'string'.`);
  });
});
