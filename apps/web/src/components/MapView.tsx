import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Badge } from './ui/badge';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { UnifiedParking } from '@shared/db';

interface MapViewProps {
  parkingLots: UnifiedParking[];
  onParkingSelect: (id: number) => void;
}

const getPriceBadgeColor = (price: number) => {
  if (price <= 10) return 'bg-green-500 hover:bg-green-600';
  if (price <= 20) return 'bg-yellow-500 hover:bg-yellow-600';
  return 'bg-orange-500 hover:bg-orange-600';
};

const getIconColor = (price: number) => {
  if (price <= 10) return 'green';
  if (price <= 20) return 'yellow';
  return 'orange';
};

const createCustomIcon = (
  price: number,
  priceDaily: number,
  translation: (key: string) => string
) => {
  const iconSize = window.innerWidth < 640 ? 50 : 70;
  const color = getIconColor(price); // green, yellow, orange

  const bgColorMap: Record<string, string> = {
    green: '#22c55e',
    yellow: '#eab308',
    orange: '#f97316',
  };

  return L.divIcon({
    className: 'custom-parking-icon cursor-pointer',
    html: `
      <div class="flex flex-col items-center text-center transform transition-all duration-200 hover:scale-110">
        <div style="background-color: ${bgColorMap[color]}; color: white; font-size: 10px; padding: 2px 4px; border-radius: 0.5rem; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          ₪${price}/${translation('priceHour')}<br/>
          ₪${priceDaily}/${translation('priceDaily')}
        </div>
        <div style="margin-top: 4px; width: 24px; height: 24px; background-color: ${bgColorMap[color]}; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          <span style="color: white; font-size: 10px; font-weight: bold;">P</span>
        </div>
      </div>
    `,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize],
    popupAnchor: [0, -iconSize],
  });
};

const FitBounds = ({ parkingLots }: { parkingLots: UnifiedParking[] }) => {
  const map = useMap();
  // useEffect(() => {
  //   if (parkingLots.length === 0) return;
  //   const bounds = L.latLngBounds(parkingLots.map((lot) => [lot.lat, lot.lng]));
  //   map.fitBounds(bounds, { padding: [50, 50] });
  // }, [parkingLots, map]);
  return null;
};

export const MapView = ({ parkingLots, onParkingSelect }: MapViewProps) => {
  const { t } = useLanguage();
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={14}
        className="w-full h-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <FitBounds parkingLots={parkingLots} />

        {parkingLots.map((lot) => (
          <Marker
            key={lot.id}
            position={[
              lot.location?.lat as number, // fix in future the type to be non-undefined
              lot.location?.lon as number,
            ]}
            // icon={createCustomIcon(lot.price, lot.priceDaily, t)}
            eventHandlers={{ click: () => onParkingSelect(lot.id) }}
          >
            <Popup>
              <div className="flex flex-col items-start">
                <strong>{lot.name}</strong>
                {/* <Badge
                  className={`mt-1 text-xs px-2 py-1 ${getPriceBadgeColor(lot.price)}`}
                >
                  ₪{lot.price} / {t('priceHour')}
                </Badge> */}
                {/* <Badge
                  className={`mt-1 text-xs px-2 py-1 ${getPriceBadgeColor(lot.priceDaily)}`}
                >
                  ₪{lot.priceDaily} / {t('priceDaily')}
                </Badge> */}
                <span className="text-xs mt-1 capitalize">{t(lot.type)}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
