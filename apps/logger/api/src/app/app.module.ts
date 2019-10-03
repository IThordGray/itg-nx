import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/logger'), LoggerModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
