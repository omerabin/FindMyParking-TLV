import {
  MapPin,
  Star,
  Umbrella,
  Sun,
  Shield,
  Navigation,
  CreditCard,
  Accessibility,
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface ParkingListItemProps {
  id: number;
  name: string;
  address: string;
  price: number;
  // distance: number;
  // rating: number;
  // reviewCount: number;
  // accessibility?: boolean;
  // pango?: boolean;
  // celloPark?: boolean;
  onClick: () => void;
}

export const ParkingListItem = ({
  name,
  address,
  price,
  // distance,
  // rating,
  // reviewCount,
  // accessibility,
  // pango,
  // celloPark,
  onClick,
}: ParkingListItemProps) => {
  const { t, dir } = useLanguage();

  const getPriceColor = () => {
    if (price <= 10) return 'bg-green-500';
    if (price <= 20) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <Card
      className="p-4 hover:shadow-lg transition-all dark:bg-gray-800 dark:border-gray-700"
      dir={dir}
    >
      <div className="space-y-3">
        <div className="flex justify-between items-start gap-3">
          <div className="flex-1">
            <h3 className="font-medium mb-1 dark:text-white">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{address}</span>
            </div>
          </div>
          <Badge className={`${getPriceColor()} text-white whitespace-nowrap`}>
            ₪{price}
            {t('hourly')}
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-1 dark:text-gray-300">
            <Navigation className="w-3 h-3 text-blue-500" />
            <span>
              {/* {distance}
              {t('meters')} */}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {/* <span className="dark:text-gray-300">{rating.toFixed(1)}</span>
            <span className="text-gray-400 dark:text-gray-500">
              ({reviewCount})
            </span> */}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* {accessibility && (
            <Badge
              variant="outline"
              className="text-xs gap-1 dark:border-gray-600 dark:text-gray-300"
            >
              <Accessibility className="w-3 h-3" />
            </Badge>
          )} */}
          {/* {pango && (
            <Badge
              variant="outline"
              className="text-xs dark:border-gray-600 dark:text-gray-300"
            >
              {t('pango')}
            </Badge>
          )} */}
          {/* {celloPark && (
            <Badge
              variant="outline"
              className="text-xs dark:border-gray-600 dark:text-gray-300"
            >
              {t('celloPark')}
            </Badge>
          )} */}
        </div>

        <Button
          variant="outline"
          className="w-full"
          size="sm"
          onClick={onClick}
        >
          {t('moreDetails')}
        </Button>
      </div>
    </Card>
  );
};
