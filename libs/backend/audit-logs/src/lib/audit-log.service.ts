import { IQueryResults, IQueryResultsOptions } from '@ithordgray/shared-utils';
import { Injectable } from '@nestjs/common';
import { IAuditLog } from './abstractions/audit-log.interface';
import { AuditLogContext } from './audit-log.context';
import { AuditLogRepository } from './audit-log.repository';

@Injectable()
export class AuditLogService {

  constructor(
    protected _repo: AuditLogRepository,
    protected _auditContext: AuditLogContext
  ) {
  }

  upsertAsync(msg: IAuditLog<unknown>): Promise<void> {
    msg.dispatchedAt = new Date();
    (msg.meta ??= {}).reference = this._auditContext.getReference();
    return this._repo.createAsync(msg);
  }

  getAllAsync(options?: IQueryResultsOptions): Promise<IQueryResults<IAuditLog<unknown>>> {
    return this._repo.getAllAsync(options);
  }
}


