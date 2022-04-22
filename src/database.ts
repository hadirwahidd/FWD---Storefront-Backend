import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env;

console.log(`From database.ts: ${ENV}`);

const client = new Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string),
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  max: 1
});

client.on('error', (error: Error) => {
  console.error(error.message);
});

export default client;
