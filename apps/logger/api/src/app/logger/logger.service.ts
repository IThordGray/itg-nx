import { Injectable } from '@angular/core';
import { LogEntryDto } from './dtos/log-entry.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ILogEntry } from './interfaces/log-entry.interface';
import { Model } from 'mongoose';
import { LogLevel } from '@itg/logger/abstractions';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor(
    @InjectModel('Log') private readonly logModel: Model<ILogEntry>
  ) {}

  public async createLogAsync(log: LogEntryDto): Promise<ILogEntry> {
    return await new this.logModel(log).save();
  }

  public async clearLogAsync(id: string): Promise<void> {
    return;
  }

  public async clearLogsAsync(): Promise<void> {
    return;
  }

  public async clearLogsByCategoryAsync(category: string): Promise<void> {
    return;
  }

  public async clearLogsByTimestampAsync(from: Date, to: Date): Promise<void> {
    return;
  }

  public async getLogAsync(id: string): Promise<LogEntryDto> {
    return undefined;
  }

  public async getLogsAsync(): Promise<LogEntryDto[]> {
    return [];
  }

  public async getLogsByCategoryAsync(
    category: string
  ): Promise<LogEntryDto[]> {
    return [];
  }

  public async getLogsByLogLevelAsync(level: LogLevel): Promise<LogEntryDto[]> {
    return [];
  }

  public async getLogsByTimestampAsync(
    from: Date,
    to: Date
  ): Promise<LogEntryDto[]> {
    return [];
  }
}
