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
        new Expression.GreaterOrEqualTo('price', 50),
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

  test('Expression.parseString() - Complex', () => {
    const exp = new Expression.And(
      new Expression.Equals('clientRef', '6276a05fdc4142352cedf6ad'),
      new Expression.And(
        new Expression.NotEquals('terminationDate', null),
        new Expression.Or(
          new Expression.Contains('policyNumber', 'er'),
          new Expression.Contains('client.userInfo.firstName', 'er'),
          new Expression.Contains('client.userInfo.lastName', 'er'),
        )
      )
    );

    expect(exp.toString()).toBe('and(clientRef=eq:6276a05fdc4142352cedf6ad,and(terminationDate=neq:null,or(policyNumber=contains:er,client.userInfo.firstName=contains:er,client.userInfo.lastName=contains:er)))');

    expect(Expression.parse(exp.toString())).toEqual(exp);
  });
});

describe('Filter expressions - ToString', () => {
  test('Expression.toString()', () => {
    const exp: Expression = new Expression.And(
      new Expression.Or(
        new Expression.Contains('name', 'vor'),
        new Expression.EndsWith('name', 'man')
      ),
      new Expression.GreaterOrEqualTo('price', 50)
    );

    expect(exp.toString()).toBe('and(or(name=contains:vor,name=endsWith:man),price=gte:50)');
  });
});

test('and(clientRef=eq:6276a05fdc4142352cedf6ad,and(terminationDate=neq:null,or(policyNumber=contains:er,client.userInfo.firstName=contains:er,client.userInfo.lastName=contains:er)))', () => {
  const exp = Expression.parse('and(clientRef=eq:6276a05fdc4142352cedf6ad,and(terminationDate=neq:null,or(policyNumber=contains:er,client.userInfo.firstName=contains:er,client.userInfo.lastName=contains:er)))');
  expect(exp).toBeDefined();
});

