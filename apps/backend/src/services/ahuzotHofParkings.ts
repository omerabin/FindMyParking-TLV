import { apiRequestGenerator } from '../utils/apiRequestGenerator';

const AHUZOT_HOF_PARKINGS_API_URL = '970/query?where=1%3D1&outFields=*&f=json';

export const getAhuzotHofParkingsFromAPI = async () =>
  apiRequestGenerator<any>({
    url: `${process.env.OPEN_DATA_TLV_API_URL}/${AHUZOT_HOF_PARKINGS_API_URL}`,
    saveToFile: 'ahuzotHofParkings.json',
  });
