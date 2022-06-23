export enum FilterLogicalExpressions {
  and = 'and',
  or = 'or',
}

export enum FilterComparatorExpressions {
  all = 'all',
  eq = 'eq',
  gt = 'gt',
  lt = 'lt',
  gte = 'gte',
  lte = 'lte',
  neq = 'neq',
  contains = 'contains',
  in = 'in',
  notIn = 'notIn',
  startsWith = 'startsWith',
  endsWith = 'endsWith',
}

export type ComparatorExpression<TExpressionType extends FilterComparatorExpressions | unknown, TValueType> =
  Expression
  & { property: string, value: TValueType, operation: TExpressionType };

export type LogicalExpression<TExpressionType extends FilterLogicalExpressions | unknown> =
  Expression
  & { expressions: Expression[], operation: TExpressionType };

export abstract class Expression<TExpressionType extends string = string> {
  protected constructor(public operation: TExpressionType) {
  }

  abstract toString(): string;
}

function isLogicalExpression(expression: Expression): expression is LogicalExpression<FilterLogicalExpressions> {
  return 'expressions' in expression;
}

function isComparatorExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions, unknown> {
  return 'property' in expression && 'value' in expression;
}

function isAndExpression(expression: Expression): expression is LogicalExpression<FilterLogicalExpressions.and> {
  return isLogicalExpression(expression) && expression.operation === FilterLogicalExpressions.and;
}

function isOrExpression(expression: Expression): expression is LogicalExpression<FilterLogicalExpressions.or> {
  return isLogicalExpression(expression) && expression.operation === FilterLogicalExpressions.or;
}

function isAllExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.all, unknown[]> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.all;
}

function isContainsExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.contains, unknown> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.contains;
}

function isEndsWithExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.endsWith, string> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.endsWith;
}

function isEqualExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.eq, unknown> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.eq;
}

function isGreaterThanExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.gt, number> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.gt;
}

function isLessThanExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.lt, number> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.lt;
}

function isGreaterThanOrEqualExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.gte, number> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.gte;
}

function isLessThanOrEqualExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.lte, number> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.lte;
}

function isNotEqualExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.neq, unknown> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.neq;
}

function isInExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.in, unknown[]> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.in;
}

function isNotInExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.notIn, unknown[]> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.notIn;
}

function isStartsWithExpression(expression: Expression): expression is ComparatorExpression<FilterComparatorExpressions.startsWith, string> {
  return isComparatorExpression(expression) && expression.operation === FilterComparatorExpressions.startsWith;
}

function CreateFilterLogicalExpression<TExpressionType extends FilterLogicalExpressions>(operation: TExpressionType): { new(...expressions: Expression[]): LogicalExpression<TExpressionType> } {
  return class extends Expression<TExpressionType> {
    expressions: Expression[];

    constructor(...expressions: Expression[]) {
      super(operation);

      this.expressions = expressions ?? [];
    }

    toString(): string {
      let v = this.operation + '(';
      const args = this.expressions
        .map((currentExpression) => `${ currentExpression.toString() }`)
        .join(',');

      v += args;
      v += ')';
      return v;
    }
  };
}

function CreateFilterComparatorExpression<TExpressionType extends FilterComparatorExpressions>(operation: TExpressionType): { new(property: string, value: unknown): ComparatorExpression<TExpressionType, unknown> } {
  return class extends Expression<TExpressionType> {
    constructor(readonly property: string, readonly value: unknown) {
      super(operation);
    }

    toString(): string {
      let v = `${ this.property }=`;
      if (this.operation) v += this.operation + ':';
      if (Array.isArray(this.value)) {
        v += `[${ this.value.join(',') }]`;
      } else {
        v += this.value;
      }
      return v;
    }
  };
}

const EqualsExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.eq);
const GreaterThanExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.gt);
const LesserThanExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.lt);
const GreaterOrEqualToExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.gte);
const LesserOrEqualToExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.lte);
const NotEqualsExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.neq);
const ContainsExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.contains);
const InExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.in);
const NotInExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.notIn);
const StartsWithExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.startsWith);
const EndsWithExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.endsWith);
const AllExpression = CreateFilterComparatorExpression(FilterComparatorExpressions.all);

const AndExpression = CreateFilterLogicalExpression(FilterLogicalExpressions.and);
const OrExpression = CreateFilterLogicalExpression(FilterLogicalExpressions.or);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const isLogicalExpressionString = (value: string) => value?.startsWith(FilterLogicalExpressions.and + '(') || value?.startsWith(FilterLogicalExpressions.or + '(');
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const isComparatorExpressionString = (value: string) => value?.includes('=') && value?.includes(':');

function parseLogicalExpression(value: string): Expression {
  const operation = value.substring(0, value.indexOf('('));
  const remainder = value.substring((operation + '(').length, value.lastIndexOf(')')) || undefined;
  const args = remainder?.split(new RegExp(/(?!\B\([^)]*),(?![^(]*\)\B)/g)).map(v => parseExpression(v)) ?? [];

  switch (operation) {
    case FilterLogicalExpressions.and :
      return new AndExpression(...args);
    case FilterLogicalExpressions.or :
      return new OrExpression(...args);
    default:
      throw new Error('Invalid logical operation used.');
  }
}

function parseComparatorExpression(value: string): Expression {
  const property = value.substring(0, value.indexOf('='));
  const operation = value.substring(value.indexOf('=') + 1, value.indexOf(':'));
  let val: string | string[] = value.substring(value.indexOf(':') + 1);
  if (val.startsWith('[') && val.endsWith(']')) {
    val = val.substring(1, val.length - 1).split(',').map(x => x.trim());
  }

  switch (operation) {
    case FilterComparatorExpressions.eq :
      return new EqualsExpression(property, val);
    case FilterComparatorExpressions.gt :
      return new GreaterThanExpression(property, val);
    case FilterComparatorExpressions.lt :
      return new LesserThanExpression(property, val);
    case FilterComparatorExpressions.gte :
      return new GreaterOrEqualToExpression(property, val);
    case FilterComparatorExpressions.lte :
      return new LesserOrEqualToExpression(property, val);
    case FilterComparatorExpressions.neq :
      return new NotEqualsExpression(property, val);
    case FilterComparatorExpressions.contains :
      return new ContainsExpression(property, val);
    case FilterComparatorExpressions.in :
      return new InExpression(property, val);
    case FilterComparatorExpressions.notIn :
      return new NotInExpression(property, val);
    case FilterComparatorExpressions.startsWith :
      return new StartsWithExpression(property, val);
    case FilterComparatorExpressions.endsWith :
      return new EndsWithExpression(property, val);
    case FilterComparatorExpressions.all :
      return new AllExpression(property, val);
    default:
      throw new Error('Invalid comparator operation used.');
  }
}

export function parseExpression(value: string): Expression {
  if (isLogicalExpressionString(value)) {
    return parseLogicalExpression(value);
  }

  if (isComparatorExpressionString(value)) {
    return parseComparatorExpression(value);
  }

  throw new Error('Unable to parse expression string.');
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Expression {
  export const parse = parseExpression;

  export const And = AndExpression;
  export const Or = OrExpression;

  export const Equals = EqualsExpression;
  export const GreaterThan = GreaterThanExpression;
  export const LessThan = LesserThanExpression;
  export const GreaterOrEqualTo = GreaterOrEqualToExpression;
  export const LesserOrEqualTo = LesserOrEqualToExpression;
  export const NotEquals = NotEqualsExpression;
  export const Contains = ContainsExpression;
  export const In = InExpression;
  export const NotIn = NotInExpression;
  export const StartsWith = StartsWithExpression;
  export const EndsWith = EndsWithExpression;
  export const All = AllExpression;

  export const isLogical = isLogicalExpression;
  export const isComparator = isComparatorExpression;

  export const isAnd = isAndExpression;
  export const isOr = isOrExpression;

  export const isAll = isAllExpression;
  export const isContains = isContainsExpression;
  export const isEndsWith = isEndsWithExpression;
  export const isEqual = isEqualExpression;
  export const isGreaterThan = isGreaterThanExpression;
  export const isLessThan = isLessThanExpression;
  export const isGreaterThanOrEqual = isGreaterThanOrEqualExpression;
  export const isLessThanOrEqual = isLessThanOrEqualExpression;
  export const isNotEqual = isNotEqualExpression;
  export const isIn = isInExpression;
  export const isNotIn = isNotInExpression;
  export const isStartsWith = isStartsWithExpression;
}
