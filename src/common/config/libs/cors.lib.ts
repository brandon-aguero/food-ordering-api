import { ForbiddenException } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const whiteList: string[] = [];
export const corsOptions: CorsOptions = {
  origin: (origin, cb) => {
    if (whiteList.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(new ForbiddenException('Not allowed by CORS'));
    }
  },
};
