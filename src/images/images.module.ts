import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadata } from '@entities/images/metadata.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metadata])],
})
export class ImagesModule {}
