import { Module } from '@nestjs/common';
import { ConfigType, ConfigModule as NestConfigModule } from '@nestjs/config';
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
    LoggerModule.forRootAsync({
      inject: [configEnv.KEY],
      useFactory: (configService: ConfigType<typeof configEnv>) => {
        const isProd = configService.isProd;

        return {
          pinoHttp: {
            transport: !isProd
              ? {
                  target: 'pino-pretty',
                  options: {
                    colorize: true,
                  },
                }
              : undefined,
            serializers: {
              req: () => undefined,
              res: () => undefined,
            },
            autoLogging: false,
          },
        };
      },
    }),
  ],
})
export class ConfigModule {}
