import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    env: process.env.NODE_ENV,
    port: Number(process.env.PORT),
  };
});
