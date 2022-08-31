import { IQueryResults, IQueryResultsOptions } from './query-results.interface';

export interface IRepository<TModel> {
  createAsync(model: Partial<TModel>): Promise<TModel>;
  createManyAsync?(models: Array<Partial<TModel>>): Promise<TModel[]>;
  getAllAsync(options?: IQueryResultsOptions): Promise<TModel[] | IQueryResults<TModel>>;
  getAsync(id: string): Promise<TModel>;
  getManyAsync?(ids: string[], options?: IQueryResultsOptions): Promise<TModel[] | IQueryResults<TModel>>;
  removeAsync(id: string, reason?: string): Promise<TModel>;
  removeManyAsync?(ids: string[], reason?: string): Promise<void>;
  removeSoftAsync?(id: string, reason: string): Promise<TModel>;
  removeSoftManyAsync?(ids: string[], reason: string): Promise<void>;
  updateAsync(id: string, update: Partial<TModel>): Promise<TModel>;
}
