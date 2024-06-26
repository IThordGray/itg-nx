export enum SortKeyWords {
  asc = 'asc',
  desc = 'desc',
}

export type IQueryOptions = IFilterOptions & IPaginationOptions & ISortOptions;

export interface IFilterOptions {
  filter?: any;
}

export interface IPaginationOptions {
  limit?: number;
  skip?: number;
}

export interface ISortOptions {
  sort?: [string, SortKeyWords][];
}
