import { set } from './set.helper';

describe('set function', () => {
  test('should set the value at the given path', () => {
    const myObj = {
      foo: {
        bar: 'baz'
      }
    };
    set(myObj, 'foo.bar', 'qux');
    expect(myObj.foo.bar).toEqual('qux');
  });

  test('should create nested objects as needed', () => {
    const myObj = {
      foo: {}
    };
    set(myObj, 'foo.bar.baz', 'qux');
    expect(myObj).toEqual({ foo: { bar: { baz: 'qux' } } });
  });
});
