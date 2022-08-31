import { RestrictedRecord } from '../types/restricted-record.type';

export interface IUpdate<TEntity extends RestrictedRecord<TEntity>> {
  id: string;
  changes: Partial<TEntity>;
}

export type ICreateDto<TEntity extends { id: string }> = Omit<TEntity, 'id'>;
export type IUpdateDto<TEntity> = IUpdate<TEntity>;
