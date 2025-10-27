import { apiRequestGenerator } from '../utils/apiRequestGenerator';

const PRIVATE_PARKINGS_API_URL = '555/query?where=1%3D1&outFields=*&f=json';

export const getPrivateParkingsFromAPI = async () =>
  apiRequestGenerator<any>({
    url: `${process.env.OPEN_DATA_TLV_API_URL}/${PRIVATE_PARKINGS_API_URL}`,
    saveToFile: 'privateParkings.json',
  });
