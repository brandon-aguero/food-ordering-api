import { Module } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerModule as NestSwaggerModule,
} from '@nestjs/swagger';
import { RawServerDefault } from 'fastify';

@Module({})
export class SwaggerModule {
  static setup(app: NestFastifyApplication<RawServerDefault>) {
    const config = new DocumentBuilder()
      .setTitle('REST API Documentation')
      .setDescription(
        'REST API built with NestJS, Fastify, Docker, PostgreSQL and TypeORM',
      )
      .setVersion('1.0')
      .build();
    const document = NestSwaggerModule.createDocument(app, config);
    NestSwaggerModule.setup('docs', app, document);
  }
}
