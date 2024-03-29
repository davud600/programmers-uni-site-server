import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  DB_HOST,
  DB_USER,
  DB_DATABASE,
  DB_PASSWORD,
  DB_PORT,
  DISCORD_INVITE_LINK,
  PAYSERA_API_LINK,
  PAYSERA_PROJECT_PASSWORD,
  PAYSERA_PROJECT_ID,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = process.env;
