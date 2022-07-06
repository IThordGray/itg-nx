import { RestrictedRecord } from '@ithordgray/shared-utils';

export interface IAuditMeta {
  reference?: string;

  [key: string]: any;
}

export interface IAuditLog<TDataType extends RestrictedRecord<TDataType>> {
  userId: string;
  action: string;
  data: TDataType;
  meta?: IAuditMeta;
  dispatchedAt?: Date;
  processedAt?: Date;
}

export class AuditLog<TDataType extends RestrictedRecord<TDataType>> implements IAuditLog<TDataType> {
  userId: string;
  action: string;
  data: any;
  meta: IAuditMeta;

  dispatchedAt: Date;
  processedAt: Date;

  constructor(args: Partial<Omit<AuditLog<TDataType>, 'dispatchTimestamp' | 'processedTimestamp'>>) {
    Object.assign(this, args ?? {});
  }
}
