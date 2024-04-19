import { IsNotEmpty, MinLength, ValidateIf } from 'class-validator';
import { DevelopmentEnv } from './dev.validation';
import { BaseEnv } from './base.validation';
import { Environment } from '../../models/enums/environment.enum';

export class ProductionEnv extends DevelopmentEnv {
  @ValidateIf((o: BaseEnv) => o.NODE_ENV === Environment.PROD)
  @IsNotEmpty()
  @MinLength(20)
  DATABASE_URL: string;
}
