import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/.env' });

export default new DataSource({
  type: 'postgres',
  host: '127.0.0.1',
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['migrations/*'],
  entities: [],
  ssl:
    process.env.POSTGRES_USE_SSL === 'true'
      ? { rejectUnauthorized: false }
      : false,
});
