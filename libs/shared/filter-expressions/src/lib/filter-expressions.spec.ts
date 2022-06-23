import { Expression } from './filter-expressions';

describe('Filter expressions - Parse', () => {
  test('Expression.parseString()', () => {
    const str = 'and(or(name=contains:vor,name=endsWith:man),price=gte:50,or(name=startsWith:Iv,name=contains:man))';

    expect(Expression.parse(str)).toMatchObject(
      new Expression.And(
        new Expression.Or(
          new Expression.Contains('name', 'vor'),
          new Expression.EndsWith('name', 'man')
        ),
        new Expression.GreaterOrEqualTo('price', '50'),
        new Expression.Or(
          new Expression.StartsWith('name', 'Iv'),
          new Expression.Contains('name', 'man')
        )
      )
    );
  });

  test('Expression.parseString() - Array', () => {
    const str = 'animal=in:[dog, cat]';

    expect(Expression.parse(str)).toMatchObject(
      new Expression.In('animal', [ 'dog', 'cat' ])
    );
  });
});

describe('Filter expressions - ToString', () => {
  test('Expression.toString()', () => {
    const exp: Expression = new Expression.And(
      new Expression.Or(
        new Expression.Contains('name', 'vor'),
        new Expression.EndsWith('name', 'man')
      ),
      new Expression.GreaterOrEqualTo('price', '50')
    );

    expect(exp.toString()).toBe('and(or(name=contains:vor,name=endsWith:man),price=gte:50)');
  });
});
