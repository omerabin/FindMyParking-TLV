import {
  AhuzotHofParkingFeatureType,
  AhuzotHofParkingType,
} from '../schemas/ahuzotHofParkingSchema';
import { PrivateParkingFeatureType, PrivateParkingType } from '../schemas';
import {
  PublicParkingFeatureType,
  PublicParkingType,
} from '../schemas/publicParkingSchema';
import {
  getAhuzotHofParkingsFromAPI,
  getPrivateParkingsFromAPI,
  getPublicParkingsFromAPI,
} from './fetcher';
import { UnifiedParking } from '@shared/schemas';

export const parkingProcessor = async () => {
  const privateParkings = await getPrivateParkingsFromAPI();
  const publicParkings = await getPublicParkingsFromAPI();
  const ahuzotHofParkings = await getAhuzotHofParkingsFromAPI();
  const filteredPrivateParkings = {
    ...privateParkings,
    features: privateParkings.features.filter(
      (feature) => !feature.attributes.del_7
    ),
  };
  const allParkings = [
    getFormattedParkingList(filteredPrivateParkings),
    getFormattedParkingList(publicParkings),
    getFormattedParkingList(ahuzotHofParkings),
  ].flat();

  return allParkings;
};

const getFormattedParkingList = <
  T extends PrivateParkingType | PublicParkingType | AhuzotHofParkingType,
>(
  parkingList: T
): UnifiedParking[] => {
  if (parkingList?.features?.length === 0) return [];

  const firstFeature = parkingList.features[0];

  if ('oid_han' in firstFeature.attributes) {
    // Private
    return (parkingList as PrivateParkingType).features.map(mapPrivateParking);
  }

  if ('oid_hof' in firstFeature.attributes) {
    // Ahuzot Hof
    return (parkingList as AhuzotHofParkingType).features.map(
      mapAhuzotHofParking
    );
  }

  if ('oid' in firstFeature.attributes) {
    // Public
    return (parkingList as PublicParkingType).features.map(mapPublicParking);
  }

  return [];
};

const mapPrivateParking = (
  feature: PrivateParkingFeatureType
): UnifiedParking => ({
  type: 'private',
  name: feature.attributes.shem_rechov,
  uniqueId: feature.attributes.UniqueId,
  location: {
    x: feature.attributes.x_coord,
    y: feature.attributes.y_coord,
  },
  dateImport: feature.attributes.date_import
    ? new Date(feature.attributes.date_import)
    : undefined,
  owner: {
    fullName: feature.attributes.shem_baal_chechbon,
  },
  capacity: {
    total: feature.attributes.num_cley_rechev,
    floors: feature.attributes.ms_koma,
  },
  pricing: {
    notes: '',
    day: feature.attributes.factor?.toString(),
  },
  availability: {
    status: feature.attributes.t_shimush,
  },
  creation_source: 'tlv-api',
});

const mapAhuzotHofParking = (
  feature: AhuzotHofParkingFeatureType
): UnifiedParking => ({
  type: 'ahuzot_hof',
  name: feature.attributes.shem_chenyon,
  uniqueId: feature.attributes.UniqueId,
  location: {
    x: feature.attributes.x,
    y: feature.attributes.y,
    lat: feature.attributes.lat,
    lon: feature.attributes.lon,
  },
  dateImport: feature.attributes.date_import
    ? new Date(feature.attributes.date_import)
    : undefined,
  capacity: {
    total: feature.attributes.mispar_mekomot_bchenyon,
  },
  pricing: {
    day: feature.attributes.taarif_yom ?? undefined,
    night: feature.attributes.taarif_layla ?? undefined,
    notes: feature.attributes.hearot_taarif ?? undefined,
  },
  availability: {
    status: feature.attributes.status_chenyon,
  },
  creation_source: 'tlv-api',
});

const mapPublicParking = (
  feature: PublicParkingFeatureType
): UnifiedParking => ({
  type: 'public',
  name: feature.attributes.name,
  uniqueId: feature.attributes.UniqueId ?? undefined,
  location: {
    x: feature.geometry.x,
    y: feature.geometry.y,
  },
  dateImport: feature.attributes.date_import
    ? new Date(feature.attributes.date_import)
    : undefined,
  capacity: {
    total: feature.attributes.num_vehicles,
    disabled: feature.attributes.num_disabled,
  },
  pricing: {
    day: feature.attributes.expiry_date ?? undefined,
  },
  availability: {
    status: feature.attributes.description ?? undefined,
  },
  lotArea: feature.attributes.lot_area,
  creation_source: 'tlv-api',
});
