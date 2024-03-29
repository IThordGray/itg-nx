import { _isNumberValue, coerceBooleanValue } from '@ithordgray/shared-utils';

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

function parseValue(value: string): any {
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') return coerceBooleanValue(value);
  if (_isNumberValue(value)) return Number(value);
  if (value === 'null') return null;
  if (value === 'undefined') return undefined;
  return value;
}

function getParsedValue(value: string | string[]): any | any[] {
  if (Array.isArray(value)) return value.map(x => parseValue(x));
  return parseValue(value);
}

function parseArguments(value: string): Expression[] {
  if (!(value.includes('(') || value.includes(')'))) return value.split(',').map(x => parseExpression(x));

  const valueArr = value.split('');
  let idx = -1;
  const bracketIdxPairs: [number, number][] = [];
  const commaIdx = [];
  for (let i = 0; i < value?.length; i++) {
    if (value[i] === '(') {
      idx += 1;
      bracketIdxPairs[idx] = [i, -1];
      continue;
    }

    if (value[i] === ')') {
      bracketIdxPairs[idx][1] = i;
      idx -= 1;
      continue;
    }

    if (value[i] === ',') {
      commaIdx.push(i);
    }
  }
  const commaSplits = commaIdx.filter(x => !bracketIdxPairs.some(([start, end]) => x > start && x < end));
  const args = [];
  commaSplits.forEach(v => {
    args.push(valueArr.splice(0, v).join(''));
    valueArr.splice(0, 1);
  });

  args.push(valueArr.join(''));

  return args.map(x => parseExpression(x));
}

function parseLogicalExpression(value: string): Expression {
  // Extract the operation, then parse the remainder as the operation's arguments.
  const operation = value.substring(0, value.indexOf('('));
  const remainder = value.substring((operation + '(').length, value.lastIndexOf(')'));
  const args = parseArguments(remainder);

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

  const parsedValue = getParsedValue(val);

  switch (operation) {
    case FilterComparatorExpressions.eq :
      return new EqualsExpression(property, parsedValue);
    case FilterComparatorExpressions.gt :
      return new GreaterThanExpression(property, parsedValue);
    case FilterComparatorExpressions.lt :
      return new LesserThanExpression(property, parsedValue);
    case FilterComparatorExpressions.gte :
      return new GreaterOrEqualToExpression(property, parsedValue);
    case FilterComparatorExpressions.lte :
      return new LesserOrEqualToExpression(property, parsedValue);
    case FilterComparatorExpressions.neq :
      return new NotEqualsExpression(property, parsedValue);
    case FilterComparatorExpressions.contains :
      return new ContainsExpression(property, parsedValue);
    case FilterComparatorExpressions.in :
      return new InExpression(property, parsedValue);
    case FilterComparatorExpressions.notIn :
      return new NotInExpression(property, parsedValue);
    case FilterComparatorExpressions.startsWith :
      return new StartsWithExpression(property, parsedValue);
    case FilterComparatorExpressions.endsWith :
      return new EndsWithExpression(property, parsedValue);
    case FilterComparatorExpressions.all :
      return new AllExpression(property, parsedValue);
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
