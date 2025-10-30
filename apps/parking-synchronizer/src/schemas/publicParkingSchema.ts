// zod dto schema for public parking
import { z } from 'zod';

// Geometry part
export const GeometryZ = z.object({
  x: z.number(),
  y: z.number(),
});

// Attributes part
export const PublicParkingAttributesZ = z.object({
  oid: z.number(),
  address: z.string(),
  lot_num: z.number().nullable(),
  ms_rishui: z.number().nullable(),
  name: z.string(),
  rishui_address: z.string().nullable(),
  description: z.string().nullable(),
  num_vehicles: z.number(),
  num_disabled: z.number(),
  expiry_date: z.string().nullable(),
  lot_area: z.number(),
  license_date: z.string().nullable(),
  achuzot: z.string().nullable(),
  covered: z.string().nullable(),
  date_import: z.string().nullable(),
});

// Full feature
export const PublicParkingFeatureZ = z.object({
  attributes: PublicParkingAttributesZ,
  geometry: GeometryZ,
});

// Full API response
export const PublicParkingSchema = z.object({
  displayFieldName: z.string(),
  fieldAliases: z.record(z.string(), z.string()),
  geometryType: z.string(),
  spatialReference: z.object({
    wkid: z.number(),
    latestWkid: z.number(),
  }),
  fields: z.array(
    z.object({
      name: z.string(),
      type: z.string(),
      alias: z.string(),
      length: z.number().optional(),
    })
  ),
  features: z.array(PublicParkingFeatureZ),
});

export type PublicParkingType = z.infer<typeof PublicParkingSchema>;

export type PublicParkingFeatureType = z.infer<typeof PublicParkingFeatureZ>;
