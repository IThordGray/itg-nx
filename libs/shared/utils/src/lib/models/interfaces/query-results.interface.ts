import { RestrictedRecord } from '../types/restricted-record.type';
import { IQueryOptions } from './query-options.interface';

export type IQueryResultsOptions = IQueryOptions;

export interface IQueryResults<TResultType extends RestrictedRecord<TResultType>> {
  results: TResultType[];
  resultsMeta: IQueryResultsOptions;
}

export class QueryResults<TResultType extends RestrictedRecord<TResultType>> implements IQueryResults<TResultType> {
  constructor(
    public results: TResultType[],
    public resultsMeta: IQueryResultsOptions
  ) {
  }
}
