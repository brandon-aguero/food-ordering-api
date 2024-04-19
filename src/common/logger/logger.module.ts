import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { LoggerModule as NestLoggerModule } from 'nestjs-pino';
import { FastifyRequest } from 'fastify';
import {
  CORRELATION_ID_HEADER,
  CorrelationIdMiddleware,
} from './middlewares/correlation-id.middleware';
import config from '../config/envs/configs/config.config';

@Module({
  imports: [
    NestLoggerModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
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
