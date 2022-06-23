import { Guid } from '@itg/shared-utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLogContext {
  private _reference: string;

  getReference(): string {
    if (!this._reference) this._reference = Guid.new();
    return this._reference;
  }
}
