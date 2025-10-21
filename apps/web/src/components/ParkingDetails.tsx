import {
  MapPin,
  Star,
  Umbrella,
  Sun,
  Shield,
  Navigation,
  Clock,
  Phone,
  ChevronRight,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';

interface ParkingDetailsProps {
  parking: {
    id: number;
    name: string;
    address: string;
    price: number;
    distance: number;
    rating: number;
    reviewCount: number;
    type: 'covered' | 'open' | 'secure';
    hours: string;
    phone: string;
    reviews: Array<{
      id: number;
      user: string;
      rating: number;
      comment: string;
      date: string;
    }>;
  };
  onBack: () => void;
}

export const ParkingDetails = ({ parking, onBack }: ParkingDetailsProps) => {
  const getTypeIcon = () => {
    switch (parking.type) {
      case 'covered':
        return <Umbrella className="w-4 h-4" />;
      case 'open':
        return <Sun className="w-4 h-4" />;
      case 'secure':
        return <Shield className="w-4 h-4" />;
    }
  };

  const getTypeLabel = () => {
    switch (parking.type) {
      case 'covered':
        return 'מקורה';
      case 'open':
        return 'פתוח';
      case 'secure':
        return 'מאובטח';
    }
  };

  const getPriceColor = () => {
    if (parking.price <= 10) return 'bg-green-500';
    if (parking.price <= 20) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="h-full overflow-y-auto" dir="rtl">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b p-4 flex items-center gap-3 z-10">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronRight className="w-5 h-5" />
        </Button>
        <h2>פרטי חניון</h2>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Info */}
        <Card className="p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h1 className="text-xl">{parking.name}</h1>
            <Badge className={`${getPriceColor()} text-white`}>
              ₪{parking.price}/שעה
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{parking.address}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{parking.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">
                ({parking.reviewCount} ביקורות)
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Navigation className="w-4 h-4 text-blue-500" />
              <span>{parking.distance} מטר</span>
            </div>

            <div className="flex items-center gap-1">
              {getTypeIcon()}
              <span>{getTypeLabel()}</span>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm">שעות פעילות: {parking.hours}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{parking.phone}</span>
            </div>
          </div>

          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            נווט לחניון
          </Button>
        </Card>

        {/* Reviews */}
        <div className="space-y-3">
          <h3 className="font-medium">ביקורות</h3>
          {parking.reviews.map((review) => (
            <Card key={review.id} className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{review.user}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
