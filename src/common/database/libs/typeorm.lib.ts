import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import {
  getEntitiesPath,
  getMigrationsPath,
} from '../utils/typeorm-paths.util';

dotenv.config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [getEntitiesPath()],
  migrations: [getMigrationsPath()],
  migrationsTableName: 'migrations',
});
