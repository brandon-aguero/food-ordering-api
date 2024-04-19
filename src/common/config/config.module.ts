import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import config from './envs/configs/config.config';
import database from './envs/configs/database.config';
import { validate } from './envs/validations/validate.validation';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '.env.development.local'],
      isGlobal: true,
      load: [config, database],
      validate,
      cache: true,
      expandVariables: true,
    }),
  ],
})
export class ConfigModule {}
