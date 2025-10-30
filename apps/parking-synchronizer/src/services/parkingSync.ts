// This service use the lat/long fields exists on the unified parking schema to implement comparison logic between external data and db data
import { UnifiedParkingModel } from '@shared/db';
import { UnifiedParking } from '@shared/schemas';

const PROBLEMATIC_AHUZOT_HOF_PARKING = [
  { lat: 32.0774, long: 34.769 },
  { y: 181198.2, x: 665627.8 },
];

const getUpdatedParkingData = (
  existing: UnifiedParking,
  parking: UnifiedParking
) => {
  const isAhuzotHofParking = existing.type === 'ahuzot_hof';
  const isPrivateParking = existing.type === 'private';
  const { pricing, ...rest } = parking;

  if (isAhuzotHofParking) {
    return (parking.location?.lat === PROBLEMATIC_AHUZOT_HOF_PARKING[0].lat &&
      parking.location?.lon === PROBLEMATIC_AHUZOT_HOF_PARKING[0].long) ||
      (parking.location?.x === PROBLEMATIC_AHUZOT_HOF_PARKING[1].x &&
        parking.location?.y === PROBLEMATIC_AHUZOT_HOF_PARKING[1].y)
      ? existing
      : parking;
  } else if (isPrivateParking) {
    const { owner, ...rest_ } = rest;
    return { ...rest_, owner: { ...existing.owner } };
  }
  return rest;
};

export const syncParkingDB = async (parkings: UnifiedParking[]) => {
  console.log(`🔄 Starting DB sync for ${parkings.length} parkings...`);

  for (const parking of parkings) {
    try {
      // Check if parking already exists by unique identifier
      const existing = await UnifiedParkingModel.findOne({
        location: parking.location,
      });

      if (existing) {
        // ✅ Update existing
        await UnifiedParkingModel.updateOne(
          { location: parking.location },
          {
            $set: getUpdatedParkingData(existing, parking),
          }
        );
      } else {
        // ➕ Create new
        await UnifiedParkingModel.create(parking);
      }
    } catch (err) {
      console.error(`❌ Failed to sync parking ${parking.name}:`, err);
    }
  }

  console.log('✅ Parking sync completed.');
};
