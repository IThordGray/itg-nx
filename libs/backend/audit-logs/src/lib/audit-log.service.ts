import { IQueryResults, IQueryResultsOptions } from '@itg/shared-utils';
import { Inject, Injectable } from '@nestjs/common';
import { IAuditLog } from './abstractions/audit-log.interface';
import { AuditLogContext } from './audit-log.context';
import { AuditLogRepository } from './audit-log.repository';

@Injectable()
export class AuditLogService {

  constructor(
    protected _repo: AuditLogRepository,
    protected _auditContext: AuditLogContext
  ) { }

  dispatch(msg: IAuditLog<unknown>): void {
    msg.dispatchedAt = new Date();
    (msg.meta ??= {}).reference = this._auditContext.getReference();
    this._repo.createAsync(msg);
  }

  getAllAsync(): Promise<IAuditLog<unknown>[]>;
  getAllAsync(options?: IQueryResultsOptions): Promise<IQueryResults<IAuditLog<unknown>>>;
  getAllAsync(options?: IQueryResultsOptions): Promise<IAuditLog<unknown>[] | IQueryResults<IAuditLog<unknown>>> {
    return this._repo.getAllAsync(options);
  }
}


