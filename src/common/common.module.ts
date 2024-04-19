import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { SwaggerModule } from './swagger/swagger.module';

@Module({
  imports: [ConfigModule, LoggerModule, DatabaseModule, SwaggerModule],
})
export class CommonModule {}
