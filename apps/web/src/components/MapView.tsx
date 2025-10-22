import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Badge } from './ui/badge';
import 'leaflet/dist/leaflet.css';

interface ParkingLot {
  id: number;
  name: string;
  price: number;
  lat: number;
  lng: number;
  type: 'covered' | 'open' | 'secure';
}

interface MapViewProps {
  parkingLots: ParkingLot[];
  onParkingSelect: (id: number) => void;
}

const parkingIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // simple parking icon
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

export const MapView = ({ parkingLots, onParkingSelect }: MapViewProps) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        {...({
          center: [32.0853, 34.7818],
          zoom: 14,
          className: 'w-full h-full',
          scrollWheelZoom: true,
        } as any)}
      >
        <TileLayer
          {...({
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          } as any)}
        />

        {parkingLots.map((lot) => (
          <Marker
            key={lot.id}
            position={[lot.lat, lot.lng]}
            icon={parkingIcon}
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
