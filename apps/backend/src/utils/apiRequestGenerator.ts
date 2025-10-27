// src/services/api/apiRequestGenerator.ts
import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';

interface ApiRequestOptions {
  url: string;
  saveToFile?: string;
}

export const apiRequestGenerator = async <T>({
  url,
  saveToFile,
}: ApiRequestOptions): Promise<T> => {
  try {
    const { data } = await axios.get<T>(url);

    if (saveToFile) {
      const fullPath = path.resolve('src/temp', saveToFile);
      await fs.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf-8');
      console.log(`✅ Data saved to ${fullPath}`);
    }

    return data;
  } catch (error) {
    console.error(`❌ Failed to fetch data from ${url}:`, error);
    throw error;
  }
};
