import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import database from '../config/envs/configs/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [database.KEY],
      useFactory: (configService: ConfigType<typeof database>) => {
        const { isProd, postgres } = configService;
        return {
          type: 'postgres',
          url: postgres.url,
          synchronize: false,
          autoLoadEntities: true,
          ssl: isProd
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
