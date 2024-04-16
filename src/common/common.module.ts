import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { SwaggerModule } from './swagger/swagger.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [ConfigModule, SwaggerModule, DatabaseModule, LoggerModule],
})
export class CommonModule {}
