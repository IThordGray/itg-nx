import { get } from './get.helper';

describe('get function', () => {
  const myObj = {
    foo: {
      bar: 'baz'
    }
  };

  test('should return the value at the given path', () => {
    expect(get(myObj, 'foo.bar')).toEqual('baz');
  });

  test('should return undefined if the path does not exist', () => {
    expect(get(myObj, 'foo.baz')).toBeUndefined();
  });

  test('should return the default value if provided and the path does not exist', () => {
    expect(get(myObj, 'foo.baz', 'default')).toEqual('default');
  });
});
