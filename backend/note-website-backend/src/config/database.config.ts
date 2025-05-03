// This file is responsible for configuring the database connection settings.
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  url: process.env.DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production',
}));