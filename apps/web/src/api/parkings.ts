// api/parkings.ts
import axios from 'axios';

export const fetchParkings = async () => {
  const { data } = await axios.get('http://localhost:5000/parkings', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return data; // assuming your backend returns an array of parkings
};
