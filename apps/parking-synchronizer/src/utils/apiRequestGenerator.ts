// src/services/api/apiRequestGenerator.ts
import axios from 'axios';
import { ZodSchema } from 'zod';

interface ApiRequestOptions<T> {
  url: string;
  schema?: ZodSchema<T>;
  maxRetries?: number;
  baseDelayMs?: number;
}

export const apiRequestGenerator = async <T>({
  url,
  schema,
  maxRetries = 5,
  baseDelayMs = 1000,
}: ApiRequestOptions<T>): Promise<T> => {
  let attempt = 0;

  while (true) {
    try {
      const { data } = await axios.get<T>(url);

      // ✅ Zod validation (if provided)
      const validatedData = schema ? schema.parse(data) : data;
      return validatedData;
    } catch (error) {
      attempt++;

      // ❌ If max retries reached, rethrow
      if (attempt > maxRetries) {
        console.error(
          `❌ Failed to fetch data from ${url} after ${maxRetries} attempts:`,
          error
        );
        throw error;
      }

      // ⏳ Exponential backoff delay
      const delay = baseDelayMs * Math.pow(2, attempt - 1);
      console.warn(
        `⚠️ Attempt ${attempt} failed for ${url}. Retrying in ${
          delay / 1000
        }s...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};
