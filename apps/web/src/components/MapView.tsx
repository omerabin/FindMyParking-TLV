import { MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

interface ParkingLot {
  id: number;
  name: string;
  price: number;
  x: number;
  y: number;
  type: 'covered' | 'open' | 'secure';
}

interface MapViewProps {
  parkingLots: ParkingLot[];
  onParkingSelect: (id: number) => void;
}

export const MapView = ({ parkingLots, onParkingSelect }: MapViewProps) => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
      {/* Mock map background */}
      <div className="absolute inset-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Mock streets */}
      <div className="absolute top-1/3 left-0 right-0 h-16 bg-gray-300 dark:bg-gray-700 opacity-40"></div>
      <div className="absolute left-1/4 top-0 bottom-0 w-12 bg-gray-300 dark:bg-gray-700 opacity-40"></div>
      <div className="absolute right-1/3 top-0 bottom-0 w-16 bg-gray-300 dark:bg-gray-700 opacity-40"></div>

      {/* Destination marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <MapPin className="w-8 h-8 text-red-500 fill-red-500" />
      </div>

      {/* Parking lot markers */}
      {parkingLots.map((lot) => (
        <button
          key={lot.id}
          onClick={() => onParkingSelect(lot.id)}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
          style={{ left: `${lot.x}%`, top: `${lot.y}%` }}
        >
          <div className="flex flex-col items-center gap-1">
            <Badge
              className={`text-xs px-2 py-1 shadow-lg ${
                lot.price <= 10
                  ? 'bg-green-500 hover:bg-green-600'
                  : lot.price <= 20
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-orange-500 hover:bg-orange-600'
              }`}
            >
              ₪{lot.price}
            </Badge>
            <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md flex items-center justify-center">
              <span className="text-white text-xs">P</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
