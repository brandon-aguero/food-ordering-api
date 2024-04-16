import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { LoggerModule as NestLoggerModule } from 'nestjs-pino';
import { FastifyRequest } from 'fastify';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './middlewares/correlation-id.middleware';
import configEnv from '../config/envs/config.env';

@Module({
  imports: [
    NestLoggerModule.forRootAsync({
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
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
