import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().transform(Number).default(4000),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  OPEN_DATA_TLV_API_URL: z
    .string()
    .url()
    .min(1, 'OPEN_DATA_TLV_API_URL is required'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  process.exit(1);
}

export const appConfig = parsedEnv.data;

export type AppConfig = typeof appConfig;
