export enum SortKeyWords {
  asc = 'asc',
  desc = 'desc',
}

export type IQueryOptions = IFilterOptions & IPaginationOptions & ISortOptions;

export interface IFilterOptions {
  filter?: string;
}

export interface IPaginationOptions {
  limit?: number;
  skip?: number;
}

export interface ISortOptions {
  sort?: Record<string, {
    order?: number;
    type: SortKeyWords;
  }>;
}
