export interface IMapper<TEntity = unknown, TModel = unknown> {
  propertyMap: { [K in keyof Partial<TModel>]: keyof TEntity };

  toEntity(model: TModel | Partial<TModel>): TEntity;

  toModel(entity: TEntity): TModel;
}
