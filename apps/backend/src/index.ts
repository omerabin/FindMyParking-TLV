import express, { Request, Response } from 'express';
import { appConfig } from './config/appConfig';
import cors from 'cors';

const app = express();
const port = appConfig.PORT;

app.use(
  cors({
    origin: appConfig.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    credentials: true, // if you send cookies or auth headers
  })
);

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`backend listening on http://localhost:${port}`);
});
