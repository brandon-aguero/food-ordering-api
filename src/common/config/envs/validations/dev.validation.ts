import {
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { BaseEnv } from './base.validation';
import { Environment } from '../../models/enums/environment.enum';

export class DevelopmentEnv {
  @ValidateIf((o: BaseEnv) => o.NODE_ENV === Environment.DEV)
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  POSTGRES_USER: string;

  @ValidateIf((o: BaseEnv) => o.NODE_ENV === Environment.DEV)
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  POSTGRES_PASSWORD: string;

  @ValidateIf((o: BaseEnv) => o.NODE_ENV === Environment.DEV)
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(9)
  POSTGRES_HOST: string;

  @ValidateIf((o: BaseEnv) => o.NODE_ENV === Environment.DEV)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(65535)
  POSTGRES_PORT: number;

  @ValidateIf((o: BaseEnv) => o.NODE_ENV === Environment.DEV)
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  POSTGRES_DB: string;
}
