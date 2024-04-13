import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigType, ConfigModule as NestConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { FastifyRequest } from 'fastify';
import configEnv from './envs/config.env';
import { validate } from './envs/validation.env';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './middlewares/correlation-id.middleware';

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
            customProps: (req: FastifyRequest['raw']) => {
              return {
                correlationId: req.headers[CORRELATION_ID_HEADER],
              };
            },
          },
        };
      },
    }),
  ],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
