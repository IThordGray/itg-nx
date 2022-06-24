import { cloneDeep } from 'lodash-es';
import { Expression } from './filter-expressions';
import { FilterExpression } from './filter-expressions.utils';

interface IPerson {
  id: string;
  age: number;
  userInfo: {
    firstName: string;
    lastName: string;
  },
  foods: string[];
}

const dataSet: IPerson[] = [
  {
    id: '5F2683A8-3CBA-2F9B-3EDB-1D5EA8924416',
    age: 23,
    userInfo: { firstName: 'Jocelyn', lastName: 'Barlow' },
    foods: [ 'stews', 'pies', 'cereals', 'sandwiches' ]
  },
  {
    id: '8856C3C9-16FD-FAC9-6415-DCF10C17A744',
    age: 37,
    userInfo: { firstName: 'Declan', lastName: 'Britt' },
    foods: [ 'stews', 'pies', 'cereals', 'sandwiches' ]
  },
  {
    id: '58B4DBB8-9E59-B715-0C51-AC077BE23DB6',
    age: 30,
    userInfo: { firstName: 'Barry', lastName: 'Benton' },
    foods: [ 'pies', 'soups', 'pasta' ]
  },
  {
    id: 'E30907A2-DA3F-5828-21A3-9E17C5D99232',
    age: 41,
    userInfo: { firstName: 'Petra', lastName: 'Barlow' },
    foods: [ 'desserts', 'noodles', 'cereals' ]
  },
  {
    id: '7E30AE5C-E7E7-4D64-31BB-5EFC99F6672B',
    age: 55,
    userInfo: { firstName: 'Jolene', lastName: 'Williams' },
    foods: [ 'seafood', 'noodles', 'stews', 'pies', 'desserts' ]
  },
  {
    id: 'AD220D47-3078-4724-8FE2-306B98012CCC',
    age: 29,
    userInfo: { firstName: 'Jenny', lastName: 'Jill' },
    foods: [ 'pasta', 'potatoes', 'stews', 'pies', 'desserts' ]
  }
];

describe('Filter expression utilities', () => {
  test('Get all people above 30', () => {
    const expectedExpression = new Expression.GreaterThan('age', 30);
    const expressionString = 'age=gt:30';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(3);
  });

  test('Get all people between 30 and 50, inclusive', () => {
    const expectedExpression = new Expression.And(
      new Expression.GreaterOrEqualTo('age', 30),
      new Expression.LesserOrEqualTo('age', 50)
    );
    const expressionString = 'and(age=gte:30,age=lte:50)';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(3);
  });

  test('Get all people that like pies', () => {
    const expectedExpression = new Expression.Contains('foods', 'pies');
    const expressionString = 'foods=contains:pies';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(5);
  });

  test('Get all people that like sandwiches or pasta', () => {
    const expectedExpression = new Expression.In('foods', [ 'sandwiches', 'pasta' ]);
    const expressionString = 'foods=in:[sandwiches,pasta]';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(4);
  });

  test('Get all people that like pies, but not cereals', () => {
    const expectedExpression = new Expression.And(
      new Expression.Contains('foods', 'pies'),
      new Expression.NotIn('foods', [ 'cereals' ])
    );
    const expressionString = 'and(foods=contains:pies,foods=notIn:[cereals])';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(3);
  });

  test('Get all people that like pies, but not cereals and is over 30', () => {
    const expectedExpression = new Expression.And(
      new Expression.Contains('foods', 'pies'),
      new Expression.NotIn('foods', [ 'cereals' ]),
      new Expression.GreaterThan('age', 30)
    );
    const expressionString = 'and(foods=contains:pies,foods=notIn:[cereals],age=gt:30)';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(1);
  });

  test('Get all people who\'se name contains "Bar"', () => {
    const expectedExpression = new Expression.Or(
      new Expression.Contains('userInfo.firstName', 'Bar'),
      new Expression.Contains('userInfo.lastName', 'Bar')
    );
    const expressionString = 'or(userInfo.firstName=contains:Bar,userInfo.lastName=contains:Bar)';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(3);
  });

  test('Get all people that like pies, and who\'se name contains "Bar"', () => {
    const expectedExpression = new Expression.And(
      new Expression.Contains('foods', 'pies'),
      new Expression.Or(
        new Expression.Contains('userInfo.firstName', 'Bar'),
        new Expression.Contains('userInfo.lastName', 'Bar')
      )
    );
    const expressionString = 'and(foods=contains:pies,or(userInfo.firstName=contains:Bar,userInfo.lastName=contains:Bar))';

    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(2);
  });

  test('Get all the people that like starch', () => {
    const expectedExpression = new Expression.In('foods', [ 'pasta', 'noodles', 'potatoes' ]);
    const expressionString = 'foods=in:[pasta, noodles, potatoes]';
    const expression = Expression.parse(expressionString);
    expect(expression).toMatchObject(expectedExpression);

    const filteredData = FilterExpression.filter(cloneDeep(dataSet), expression);
    expect(filteredData.length).toBe(4);
  });
});
