import { IQueryResults, IQueryResultsOptions, RestrictedRecord } from '@ithordgray/shared-utils';
import { IAuditLog } from './abstractions/audit-log.interface';

export abstract class AuditLogRepository {
  abstract createAsync<TDataType extends RestrictedRecord<TDataType>>(auditLog: IAuditLog<TDataType>): Promise<void>;

  abstract getAllAsync<TDataType extends RestrictedRecord<TDataType>>(options?: IQueryResultsOptions): Promise<IQueryResults<IAuditLog<TDataType>>>;
}
