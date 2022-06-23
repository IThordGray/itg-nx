import { Module, Scope } from '@nestjs/common';
import { AuditLogContext } from './audit-log.context';
import { AuditLogService } from './audit-log.service';

@Module({
  controllers: [],
  providers: [
    AuditLogService,
    { provide: AuditLogContext, scope: Scope.REQUEST, useFactory: () => new AuditLogContext() }
  ],
  exports: [
    AuditLogService,
    AuditLogContext
  ],
})
export class AuditLogModule {}
