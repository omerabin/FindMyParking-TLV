// zod dto schema for private parking
import { z } from 'zod';

// Geometry part
export const GeometryZ = z.object({
  x: z.number(),
  y: z.number(),
});

// Attributes part
export const PrivateParkingAttributesZ = z.object({
  oid_han: z.number(),
  k_rechov: z.number(),
  shem_rechov: z.string(),
  ms_bait: z.number(),
  shem_rechov_rev: z.string(),
  del_7: z.number(),
  shem_baal_chechbon: z.string(),
  k_shimush: z.number(),
  t_shimush: z.string(),
  ms_koma: z.number(),
  shetach_arnona: z.number(),
  factor: z.number(),
  num_cley_rechev: z.number(),
  x_coord: z.number(),
  y_coord: z.number(),
  UniqueId: z.string(),
  date_import: z.string().nullable(),
});

// Full feature
export const PrivateParkingFeatureZ = z.object({
  attributes: PrivateParkingAttributesZ,
  geometry: GeometryZ,
});

// Full API response
export const PrivateParkingAPI = z.object({
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
  features: z.array(PrivateParkingFeatureZ),
});
