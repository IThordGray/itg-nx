export interface IAggregateErrorResponseItem {
  statusCode: string;
  errorMessage: string;
}

export interface IAggregateSuccessResponseItem<TData> {
  statusCode: string;
  data: TData;
}

export interface IAggregateResponse<TData = any> {
  items: (IAggregateErrorResponseItem | IAggregateSuccessResponseItem<TData>)[];
  length: number;
}