import proj4 from 'proj4';

export const convertUTMToLatLon = (x: number, y: number) => {
  const ITM = `+proj=tmerc +lat_0=31.73439361111111 +lon_0=35.20451694444445 
  +k=1.0000067 +x_0=219529.584 +y_0=626907.39 
  +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs`;

  return proj4(ITM, 'EPSG:4326', [x, y]);
};
