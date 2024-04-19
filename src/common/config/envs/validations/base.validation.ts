import { IsEnum, IsNumber, Max, Min } from 'class-validator';
import { ProductionEnv } from './prod.validation';
import { Environment } from '../../models/enums/environment.enum';

export class BaseEnv extends ProductionEnv {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;
}
