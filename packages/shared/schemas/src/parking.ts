// zod dto schema for parking
import { z } from 'zod';

// Nested objects
export const OwnerZod = z.object({
  fullName: z.string().optional(),
  contactPhone: z.string().optional(),
  userId: z.string().optional(), // ObjectId as string
});

export const AddressCodesZ = z.object({
  k_rechov: z.number().optional(),
  ms_bait: z.number().optional(),
  oid_han: z.number().optional(),
  oid_hof: z.number().optional(),
});

export const AddressZod = z.object({
  street: z.string().optional(),
  buildingNumber: z.number().optional(),
  city: z.string().optional(),
  raw: z.string().optional(),
  codes: AddressCodesZ.optional(),
});

export const LocationZod = z.object({
  x: z.number().optional(),
  y: z.number().optional(),
  lat: z.number().optional(),
  lon: z.number().optional(),
});

export const CapacityZod = z.object({
  total: z.number().optional(),
  reserved: z.number().optional(),
  disabled: z.number().optional(),
  floors: z.number().optional(),
});

export const PricingZod = z.object({
  entry: z.number().optional(),
  day: z.string().optional(),
  night: z.string().optional(),
  notes: z.string().optional(),
});

export const AvailabilityZod = z.object({
  status: z.string().optional(),
  updatedAt: z.date().optional(),
});

// Main Unified Parking schema
export const UnifiedParkingZod = z.object({
  type: z.enum(['private', 'public', 'ahuzot_hof']),
  name: z.string(),
  owner: OwnerZod.optional(),
  address: AddressZod.optional(),
  location: LocationZod.optional(),
  capacity: CapacityZod.optional(),
  pricing: PricingZod.optional(),
  availability: AvailabilityZod.optional(),
  lotArea: z.number().optional(),
  usageType: z.string().optional(),
  uniqueId: z.string().optional(),
  dateImport: z.date().optional(),
  isActive: z.boolean().optional(),
  creation_source: z.enum(['tlv-api', 'get-parking']),
});

export type UnifiedParking = z.infer<typeof UnifiedParkingZod>;
