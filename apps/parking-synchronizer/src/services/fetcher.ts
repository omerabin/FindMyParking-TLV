import { AhuzotHofParkingSchema } from '../schemas/ahuzotHofParkingSchema';
import { PrivateParkingSchema } from '../schemas/privateParkingSchema';
import { PublicParkingSchema } from '../schemas/publicParkingSchema';
import { apiRequestGenerator } from '../utils/apiRequestGenerator';

const AHUZOT_HOF_PARKINGS_API_URL = '970/query?where=1%3D1&outFields=*&f=json';
const PRIVATE_PARKINGS_API_URL = '555/query?where=1%3D1&outFields=*&f=json';
const PUBLIC_PARKINGS_API_URL = '556/query?where=1%3D1&outFields=*&f=json';

export const getAhuzotHofParkingsFromAPI = async () =>
  apiRequestGenerator({
    url: `${process.env.OPEN_DATA_TLV_API_URL}/${AHUZOT_HOF_PARKINGS_API_URL}`,
    schema: AhuzotHofParkingSchema,
  });

export const getPrivateParkingsFromAPI = async () =>
  apiRequestGenerator({
    url: `${process.env.OPEN_DATA_TLV_API_URL}/${PRIVATE_PARKINGS_API_URL}`,
    schema: PrivateParkingSchema,
  });

export const getPublicParkingsFromAPI = async () =>
  apiRequestGenerator({
    url: `${process.env.OPEN_DATA_TLV_API_URL}/${PUBLIC_PARKINGS_API_URL}`,
    schema: PublicParkingSchema,
  });
