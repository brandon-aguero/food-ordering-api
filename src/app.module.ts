import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [CommonModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
