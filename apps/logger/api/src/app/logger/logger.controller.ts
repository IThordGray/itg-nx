import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query
} from '@nestjs/common';
import { LogEntryDto } from './dtos/log-entry.dto';
import { LoggerService } from './logger.service';
import { LogLevel } from '@itg/logger/abstractions';

@Controller('logs')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  public async createLogAsync(@Body() log: LogEntryDto): Promise<void> {
    await this.loggerService.createLogAsync(log);
  }

  @Delete(':id')
  public async clearLogAsync(@Param('id') id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  @Delete()
  public async clearLogsAsync(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  @Delete()
  public async clearLogsByCategoryAsync(
    @Query('category') category: string
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  @Delete()
  public async clearLogsByTimestampAsync(
    @Query('from') from: Date,
    @Query('to') to: Date
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  @Get(':id')
  public async getLogAsync(id: string): Promise<LogEntryDto> {
    throw new Error('Method not implemented.');
  }

  @Get()
  public async getLogsAsync(): Promise<LogEntryDto[]> {
    return [
      {
        id: 'a',
        category: '',
        logLevel: 'Trace',
        message: 'success'
      }
    ];
  }

  @Get()
  public async getLogsByCategoryAsync(
    @Query('category') category: string
  ): Promise<LogEntryDto[]> {
    throw new Error('Method not implemented.');
  }

  @Get()
  public async getLogsByLogLevelAsync(
    @Query('level') logLevel: LogLevel
  ): Promise<LogEntryDto[]> {
    throw new Error('Method not implemented.');
  }

  @Get()
  public async getLogsByTimestampAsync(
    @Query('from') from: Date,
    @Query('to') to: Date
  ): Promise<LogEntryDto[]> {
    throw new Error('Method not implemented.');
  }
}
