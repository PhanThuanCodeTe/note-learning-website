import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    },
  };
});