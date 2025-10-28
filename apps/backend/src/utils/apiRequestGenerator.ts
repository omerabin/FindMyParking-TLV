// src/services/api/apiRequestGenerator.ts
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { ZodSchema } from 'zod';

interface ApiRequestOptions<T> {
  url: string;
  saveToFile?: string;
  schema?: ZodSchema<T>;
}

export const apiRequestGenerator = async <T>({
  url,
  saveToFile,
  schema,
}: ApiRequestOptions<T>): Promise<T> => {
  try {
    const { data } = await axios.get<T>(url);

    const validatedData = schema ? schema.parse(data) : data;

    if (saveToFile) {
      const fullPath = path.resolve('src/temp', saveToFile);
      await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Data saved to ${fullPath}`);
    }

    return validatedData;
  } catch (error) {
    console.error(`❌ Failed to fetch data from ${url}:`, error);
    throw error;
  }
};
