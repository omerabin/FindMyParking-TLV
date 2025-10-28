import { UnifiedParkingModel } from '@shared/db';

export const ParkingService = {
  getAllParkings: async () => UnifiedParkingModel.find().lean(),
};
