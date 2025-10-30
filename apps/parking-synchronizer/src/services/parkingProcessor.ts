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
import { UnifiedParking, UnifiedParkingZod } from '@shared/schemas';
import { getFormattedDate } from '../utils/processorUtils';

export const parkingProcessor = async () => {
  const privateParkings = await getPrivateParkingsFromAPI();
  const publicParkings = await getPublicParkingsFromAPI();
  const ahuzotHofParkings = await getAhuzotHofParkingsFromAPI();
  const distinctPrivateParkingsFeaturesSet = new Set();

  const filteredPrivateParkings = {
    ...privateParkings,
    features: [] as PrivateParkingFeatureType[],
  };

  for (const feature of privateParkings.features) {
    const key = feature.attributes.del_7;
    if (!key) continue;

    if (!distinctPrivateParkingsFeaturesSet.has(key)) {
      distinctPrivateParkingsFeaturesSet.add(key);
      filteredPrivateParkings.features.push(feature);
    }
  }
  const allParkings = [
    getFormattedParkingList(filteredPrivateParkings),
    getFormattedParkingList(publicParkings),
    getFormattedParkingList(ahuzotHofParkings),
  ].flat();

  const parsedParkings = UnifiedParkingZod.array().safeParse(allParkings);
  if (!parsedParkings.success) {
    console.error('❌ Validation failed:', parsedParkings.error.flatten());
    throw new Error('Invalid UnifiedParking data');
  }
  return allParkings;
};

const getFormattedParkingList = <
  T extends PrivateParkingType | PublicParkingType | AhuzotHofParkingType,
>(
  parkingList: T
): UnifiedParking[] => {
  if (!parkingList?.features?.length) return [];

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
  name: feature.attributes.shem_rechov ?? '',
  location: {
    x: feature.attributes.x_coord,
    y: feature.attributes.y_coord,
  },
  dateImport: feature.attributes.date_import
    ? getFormattedDate(feature.attributes.date_import)
    : undefined,
  owner: {
    fullName: feature.attributes.shem_baal_chechbon,
  },
  capacity: {
    total: feature.attributes.num_cley_rechev,
    floors: feature.attributes.ms_koma,
  },
  pricing: {
    day: '',
    entry: undefined,
    night: undefined,
    notes: '',
  },
  availability: {
    status: feature.attributes.t_shimush,
  },
  creation_source: 'tlv-api',
  address: {
    city: 'Tel Aviv',
    street: feature.attributes.shem_rechov,
    buildingNumber: feature.attributes.ms_bait,
  },
});

const mapAhuzotHofParking = (
  feature: AhuzotHofParkingFeatureType
): UnifiedParking => ({
  type: 'ahuzot_hof',
  name: feature.attributes.shem_chenyon ?? '',
  location: {
    x: feature.attributes.x,
    y: feature.attributes.y,
    lat: feature.attributes.lat,
    lon: feature.attributes.lon,
  },
  dateImport: feature.attributes.date_import
    ? getFormattedDate(feature.attributes.date_import)
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
  address: {
    street: feature.attributes.ktovet,
  },
});

const mapPublicParking = (
  feature: PublicParkingFeatureType
): UnifiedParking => ({
  type: 'public',
  name: feature.attributes.name ?? '',
  location: {
    x: feature.geometry.x,
    y: feature.geometry.y,
  },
  dateImport: feature.attributes.date_import
    ? getFormattedDate(feature.attributes.date_import)
    : undefined,
  capacity: {
    total: feature.attributes.num_vehicles,
    disabled: feature.attributes.num_disabled,
  },
  pricing: {
    day: '',
    entry: undefined,
    night: '',
    notes: '',
  },
  availability: {
    status: '',
  },
  creation_source: 'tlv-api',
  address: {
    street: feature.attributes.address,
  },
});
