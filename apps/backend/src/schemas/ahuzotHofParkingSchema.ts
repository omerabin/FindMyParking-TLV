// zod dto schema for ahuzot hof parking
import { z } from 'zod';

// Geometry part
export const GeometryZ = z.object({
  x: z.number(),
  y: z.number(),
});

// Attributes part
export const AhuzotHofAttributesZ = z.object({
  oid_hof: z.number(),
  rowid: z.number(),
  code_achoza: z.number(),
  ControllerID: z.number(),
  shem_chenyon: z.string(),
  ktovet: z.string(),
  lon: z.number(),
  lat: z.number(),
  taarif_yom: z.string().nullable(),
  chalon_taarif_yom: z.string().nullable(),
  taarif_layla: z.string().nullable(),
  chalon_zman_taarif_layla: z.string().nullable(),
  taarif_yomi: z.string().nullable(),
  chalon_zman_taarif_yomi: z.string().nullable(),
  taarif_yom_manuy_chodshi: z.string().nullable(),
  chalon_zman_yom_taarif_yomi: z.string().nullable(),
  taarif_layla_manuy_chodshi: z.string().nullable(),
  chalon_zman_layal_taarif_yomi: z.string().nullable(),
  hearot_taarif: z.string().nullable(),
  chalon_zman_chenyon_patoach: z.string().nullable(),
  mispar_mekomot_bchenyon: z.number(),
  mispar_mekomot_manuy_bchenyon: z.number(),
  status_chenyon: z.string(),
  tr_status_chenyon: z.number(),
  y: z.number(),
  x: z.number(),
  UniqueId: z.string(),
  date_import: z.string().nullable(),
});

// Full feature
export const AhuzotHofFeatureZ = z.object({
  attributes: AhuzotHofAttributesZ,
  geometry: GeometryZ,
});

// Full API response
export const AhuzotHofParkingAPI = z.object({
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
  features: z.array(AhuzotHofFeatureZ),
});
