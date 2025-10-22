import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Badge } from './ui/badge';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/contexts/LanguageContext';

interface ParkingLot {
  id: number;
  name: string;
  price: number;
  priceDaily: number;
  lat: number;
  lng: number;
  type: 'covered' | 'open' | 'secure';
}

interface MapViewProps {
  parkingLots: ParkingLot[];
  onParkingSelect: (id: number) => void;
}

const createCustomIcon = (
  price: number,
  priceDaily: number,
  translation: (key: string) => string
) =>
  L.divIcon({
    className: 'custom-parking-icon',
    html: `
        <div class="flex flex-col items-center text-center transform hover:scale-105 transition-transform">
          <div class="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg shadow-md border border-white">
            ₪${price}/${translation('priceHour')} ₪${priceDaily}/${translation('priceDaily')}
          </div>
          <div class="mt-1 w-6 h-6 bg-blue-700 rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <span class="text-white text-xs">P</span>
          </div>
        </div>
      `,
    iconSize: [60, 40],
    iconAnchor: [35, 40],
    popupAnchor: [0, -40],
  });

export const MapView = ({ parkingLots, onParkingSelect }: MapViewProps) => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        {...{
          center: [32.0853, 34.7818],
          zoom: 14,
          className: 'w-full h-full',
          scrollWheelZoom: true,
        }}
      >
        <TileLayer
          {...{
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }}
        />

        {parkingLots.map((lot) => (
          <Marker
            key={lot.id}
            position={[lot.lat, lot.lng]}
            icon={createCustomIcon(lot.price, lot.priceDaily, t)}
            eventHandlers={{
              click: () => onParkingSelect(lot.id),
            }}
          >
            <Popup>
              <div className="flex flex-col items-start">
                <strong>{lot.name}</strong>
                <Badge
                  className={`mt-1 text-xs px-2 py-1 ${
                    lot.price <= 10
                      ? 'bg-green-500 hover:bg-green-600'
                      : lot.price <= 20
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-orange-500 hover:bg-orange-600'
                  }`}
                >
                  ₪{lot.price}
                </Badge>
                <span className="text-xs mt-1 capitalize">{lot.type}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
