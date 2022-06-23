import { IQueryResults, IQueryResultsOptions } from '@itg/shared-utils';
import { IAuditLog } from './abstractions/audit-log.interface';

export abstract class AuditLogRepository {
  abstract createAsync(auditLog: IAuditLog<unknown>): Promise<void>;

  abstract getAllAsync(): Promise<IAuditLog<unknown>[]>;
  abstract getAllAsync(options?: IQueryResultsOptions): Promise<IQueryResults<IAuditLog<unknown>>>;
  abstract getAllAsync(options?: IQueryResultsOptions): Promise<IAuditLog<unknown>[] | IQueryResults<IAuditLog<unknown>>>;
}
