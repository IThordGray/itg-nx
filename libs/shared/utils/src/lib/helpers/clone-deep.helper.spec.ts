import { cloneDeep } from './clone-deep.helper';

describe('cloneDeep function', () => {
  test('should return a deep clone of an object', () => {
    const myObj = {
      foo: {
        bar: 'baz'
      }
    };
    const myClonedObj = cloneDeep(myObj);
    myClonedObj.foo.bar = 'qux';
    expect(myObj.foo.bar).toEqual('baz');
    expect(myClonedObj.foo.bar).toEqual('qux');
  });

  test('should return a deep clone of an array', () => {
    const myArray: [ { foo: string }, number[] ] = [
      { foo: 'bar' },
      [ 1, 2, 3 ]
    ];
    const myClonedArray = cloneDeep(myArray);
    myClonedArray[0].foo = 'baz';
    myClonedArray[1][1] = 4;
    expect(myArray[0].foo).toEqual('bar');
    expect(myArray[1][1]).toEqual(2);
    expect(myClonedArray[0].foo).toEqual('baz');
    expect(myClonedArray[1][1]).toEqual(4);
  });

  test('should return a deep clone of a primitive', () => {
    const myNumber = 42;
    const myClonedNumber = cloneDeep(myNumber);
    expect(myClonedNumber).toEqual(myNumber);
  });

  test('should return a deep clone of null', () => {
    const myNull = null;
    const myClonedNull = cloneDeep(myNull);
    expect(myClonedNull).toEqual(myNull);
  });
});
