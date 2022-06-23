import get from 'lodash-es/get';
import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import { ComparatorExpression, Expression, LogicalExpression } from './filter-expressions';

function getFilterQuery<TValue>(value: TValue, expression: Expression): boolean {
  if (Expression.isComparator(expression)) return getComparorQuery(value, expression);
  if (Expression.isLogical(expression)) return getLogicalQuery(value, expression);
  return false;
}

function getLogicalQuery<TValue>(model: TValue, expression: LogicalExpression<unknown>): boolean {
  if (Expression.isAnd(expression)) return expression.expressions.every(e => getFilterQuery(model, e));
  if (Expression.isOr(expression)) return expression.expressions.some(e => getFilterQuery(model, e));
  return false;
}

function getComparorQuery<TValue>(value: TValue, expression: ComparatorExpression<unknown, unknown>): boolean {
  const propertyValue: unknown = get(value, expression.property);

  // All values must be in the expression value to be considered true.
  if (Expression.isAll(expression)) return expression.value.every(v => {
    if (isString(v)) v = v.toLowerCase();
    if (Array.isArray(propertyValue)) return propertyValue.some(x => (isString(x) ? x.toLowerCase() : x) === v);
    return (isString(propertyValue) ? propertyValue.toLowerCase() : propertyValue) === v;
  });

  // Some values must be in the expression value to be considered true.
  if (Expression.isIn(expression)) return expression.value.some(v => {
    if (isString(v)) v = v.toLowerCase();
    if (Array.isArray(propertyValue)) return propertyValue.some(x => (isString(x) ? x.toLowerCase() : x) === v);
    return (isString(propertyValue) ? propertyValue.toLowerCase() : propertyValue) === v;
  });

  // None of the values may be in the expression value to be considered true.
  if (Expression.isNotIn(expression)) return !expression.value.some(v => {
    if (isString(v)) v = v.toLowerCase();
    if (Array.isArray(propertyValue)) return propertyValue.some(x => (isString(x) ? x.toLowerCase() : x) === v);
    return (isString(propertyValue) ? propertyValue.toLowerCase() : propertyValue) === v;
  });

  // A value or array must contain the expression value to be considered true.
  if (Expression.isContains(expression)) {
    let v = expression.value;
    if (isString(v)) v = v.toLowerCase();
    if (isString(propertyValue) && isString(expression.value)) return propertyValue.toLowerCase().includes(expression.value.toLowerCase());
    if (Array.isArray(propertyValue)) return propertyValue.some(x => (isString(x) ? x.toLowerCase() : x) === v);
    return false;
  }

  if (Expression.isStartsWith(expression)) {
    if (!isString(propertyValue) || !isString(expression.value)) return false;
    return propertyValue.toLowerCase().startsWith(expression.value.toLowerCase());
  }

  if (Expression.isEndsWith(expression)) {
    if (!isString(propertyValue) || !isString(expression.value)) return false;
    return propertyValue.toLowerCase().endsWith(expression.value.toLowerCase());
  }

  if (Expression.isEqual(expression)) {
    if (isString(propertyValue) && isString(expression.value)) return propertyValue.toLowerCase() === expression.value.toLowerCase();
    if (Array.isArray(propertyValue) && Array.isArray(expression.value)) return propertyValue.every(x => (expression.value as Array<unknown>).some(y => y === x));
    return propertyValue === expression.value;
  }

  if (Expression.isNotEqual(expression)) {
    if (isString(propertyValue) && isString(expression.value)) return propertyValue.toLowerCase() !== expression.value.toLowerCase();
    if (Array.isArray(propertyValue) && Array.isArray(expression.value)) return !propertyValue.some(x => (expression.value as Array<unknown>).some(y => y === x));
    return propertyValue !== expression.value;
  }

  if (Expression.isGreaterThan(expression)) {
    if (!isNumber(propertyValue) || !isNumber(expression.value)) return false;
    return propertyValue > expression.value;
  }

  if (Expression.isGreaterThanOrEqual(expression)) {
    if (!isNumber(propertyValue) || !isNumber(expression.value)) return false;
    return propertyValue >= expression.value;
  }

  if (Expression.isLessThan(expression)) {
    if (!isNumber(propertyValue) || !isNumber(expression.value)) return false;
    return propertyValue < expression.value;
  }

  if (Expression.isLessThanOrEqual(expression)) {
    if (!isNumber(propertyValue) || !isNumber(expression.value)) return false;
    return propertyValue <= expression.value;
  }

  return false;
}

export class FilterExpression {
  static filter<TValue>(values: TValue[], expression: Expression): TValue[] {
    return values.filter(value => getFilterQuery(value, expression));
  }
}
