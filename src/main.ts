import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { SwaggerModule } from './common/swagger/swagger.module';
import { corsOptions } from './common/config/libs/cors.lib';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );
  app.enableCors(corsOptions);
  app.useLogger(app.get(Logger));
  const configService = app.get(ConfigService);
  SwaggerModule.setup(app);
  await app.listen(Number(configService.get('PORT')), '0.0.0.0');
}
bootstrap();
