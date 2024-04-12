import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configEnv from './envs/config.env';
import { validate } from './envs/validation.env';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [configEnv],
      validate,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
  ],
})
export class ConfigModule {}
