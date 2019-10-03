import { Module } from '@nestjs/common';
import { CommonModule } from '@angular/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogEntrySchema } from './schemas/log-entry.schema';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([{ name: 'Log', schema: LogEntrySchema }])
  ],
  controllers: [LoggerController],
  providers: [LoggerService]
})
export class LoggerModule {}
