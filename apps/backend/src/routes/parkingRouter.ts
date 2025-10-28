import { Router, Request, Response } from 'express';
import { ParkingService } from '../services/parkingService';

const router = Router();

// GET /parkings - get all parkings from DB
router.get('/', async (req: Request, res: Response) => {
  try {
    const parkings = await ParkingService.getAllParkings();
    res.json(parkings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch parkings' });
  }
});

export default router;
