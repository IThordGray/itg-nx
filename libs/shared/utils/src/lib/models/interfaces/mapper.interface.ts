export interface IMapper<TEntity = unknown, TModel = unknown> {
  propertyMap: { [K in keyof Partial<TModel>]: keyof TEntity };

  toModel(entity: TEntity): TModel;

  toEntity(model: TModel | Partial<TModel>): TEntity;
}
