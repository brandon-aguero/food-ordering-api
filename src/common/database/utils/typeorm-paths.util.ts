import { join } from 'node:path';

export function getEntitiesPath() {
  return join(__dirname, '..', '**', '*.entity.{js,ts}');
}

export function getMigrationsPath() {
  return join(__dirname, '..', 'migrations', '*.{js,ts}');
}
