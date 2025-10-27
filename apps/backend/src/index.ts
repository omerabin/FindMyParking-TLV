import express, { Request, Response } from 'express';
import { appConfig } from './config/appConfig';

const app = express();
const port = appConfig.PORT;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});

import {} from '@shared/schemas';
