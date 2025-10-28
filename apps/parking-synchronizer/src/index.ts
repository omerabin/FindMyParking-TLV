import express, { Request, Response } from 'express';
import { appConfig } from './config/appConfig';
import { parkingProcessor } from './services/parkingProcessor';
import { syncParkingDB } from './services/parkingSync';
import { connectDB } from '@shared/db';

const app = express();
const port = appConfig.PORT;

app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`parking-synchronizer listening on http://localhost:${port}`);
});

// NOTE: for now its running as express service. In the future it will run as a node worker that schedules once a day
(async () => {
  await connectDB(appConfig.MONGO_URI);
  const parkingsFromApi = await parkingProcessor();
  syncParkingDB(parkingsFromApi);
})();
