import { apiRequestGenerator } from '../utils/apiRequestGenerator';

const PUBLIC_PARKINGS_API_URL = '556/query?where=1%3D1&outFields=*&f=json';

export const getPublicParkingsFromAPI = async () =>
  apiRequestGenerator<any>({
    url: `${process.env.OPEN_DATA_TLV_API_URL}/${PUBLIC_PARKINGS_API_URL}`,
    saveToFile: 'publicParkings.json',
  });
