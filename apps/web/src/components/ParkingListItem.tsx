import { MapPin, Star, Umbrella, Sun, Shield, Navigation } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ParkingListItemProps {
  id: number;
  name: string;
  address: string;
  price: number;
  distance: number;
  rating: number;
  reviewCount: number;
  type: 'covered' | 'open' | 'secure';
  onClick: () => void;
}

export function ParkingListItem({
  name,
  address,
  price,
  distance,
  rating,
  reviewCount,
  type,
  onClick,
}: ParkingListItemProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'covered':
        return <Umbrella className="w-4 h-4" />;
      case 'open':
        return <Sun className="w-4 h-4" />;
      case 'secure':
        return <Shield className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'covered':
        return 'מקורה';
      case 'open':
        return 'פתוח';
      case 'secure':
        return 'מאובטח';
    }
  };

  const getPriceColor = () => {
    if (price <= 10) return 'bg-green-500';
    if (price <= 20) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
      dir="rtl"
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium">{name}</h3>
            <Badge className={`${getPriceColor()} text-white`}>
              ₪{price}/שעה
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-3 h-3" />
            <span>{address}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Navigation className="w-3 h-3 text-blue-500" />
              <span>{distance}מ׳</span>
            </div>

            <div className="flex items-center gap-1">
              {getTypeIcon()}
              <span>{getTypeLabel()}</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{rating.toFixed(1)}</span>
              <span className="text-gray-400">({reviewCount})</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
