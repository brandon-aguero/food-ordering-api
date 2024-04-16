import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configEnv from './envs/config.env';
import { validate } from './envs/validation.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configEnv],
      validate,
    }),
  ],
})
export class ConfigModule {}
