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
  Camera,
  ExternalLink,
  CreditCard,
  Accessibility,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Textarea } from './ui/textarea';
import { useLanguage } from '../contexts/LanguageContext';

interface ParkingDetailsV2Props {
  parking: {
    id: number;
    name: string;
    address: string;
    price: number;
    priceDaily?: number;
    priceMonthly?: number;
    distance: number;
    rating: number;
    reviewCount: number;
    type: 'covered' | 'open' | 'secure';
    hours: string;
    phone: string;
    accessibility: boolean;
    pango: boolean;
    celloPark: boolean;
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

export function ParkingDetailsV2({ parking, onBack }: ParkingDetailsV2Props) {
  const { t, dir } = useLanguage();

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
        return t('covered');
      case 'open':
        return t('open');
      case 'secure':
        return t('secure');
    }
  };

  const getPriceColor = () => {
    if (parking.price <= 10) return 'bg-green-500';
    if (parking.price <= 20) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const openWaze = () => {
    window.open(
      `https://waze.com/ul?q=${encodeURIComponent(parking.address)}`,
      '_blank'
    );
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(parking.address)}`,
      '_blank'
    );
  };

  return (
    <div
      className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-900"
      dir={dir}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-800 p-4 flex items-center gap-3 z-10 shadow-sm">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronRight className="w-5 h-5" />
        </Button>
        <h2 className="font-medium dark:text-white">{t('moreDetails')}</h2>
      </div>

      {/* Parking Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
        <MapPin className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="p-4 space-y-4">
        {/* Main Info */}
        <Card className="p-4 space-y-3 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-semibold dark:text-white">
              {parking.name}
            </h1>
            <Badge className={`${getPriceColor()} text-white`}>
              ₪{parking.price}
              {t('hourly')}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{parking.address}</span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium dark:text-white">
                {parking.rating.toFixed(1)}
              </span>
              <span className="text-gray-400 text-sm">
                ({parking.reviewCount} {t('reviews')})
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm dark:text-gray-300">
              <Navigation className="w-4 h-4 text-blue-500" />
              <span>
                {parking.distance} {t('meters')}
              </span>
            </div>

            <div className="flex items-center gap-1 text-sm dark:text-gray-300">
              {getTypeIcon()}
              <span>{getTypeLabel()}</span>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Price List */}
          <div className="space-y-2">
            <h3 className="font-medium dark:text-white">{t('priceRange')}</h3>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                <div className="text-gray-500 dark:text-gray-400">
                  {t('hourly')}
                </div>
                <div className="font-medium text-blue-600 dark:text-blue-400">
                  ₪{parking.price}
                </div>
              </div>
              {parking.priceDaily && (
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <div className="text-gray-500 dark:text-gray-400">
                    {t('daily')}
                  </div>
                  <div className="font-medium text-blue-600 dark:text-blue-400">
                    ₪{parking.priceDaily}
                  </div>
                </div>
              )}
              {parking.priceMonthly && (
                <div className="text-center p-2 bg-gray-50 dark:bg-gray-900 rounded">
                  <div className="text-gray-500 dark:text-gray-400">
                    {t('monthly')}
                  </div>
                  <div className="font-medium text-blue-600 dark:text-blue-400">
                    ₪{parking.priceMonthly}
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Operating Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm dark:text-gray-300">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{parking.hours}</span>
            </div>
            <div className="flex items-center gap-2 text-sm dark:text-gray-300">
              <Phone className="w-4 h-4 text-gray-500" />
              <span>{parking.phone}</span>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Payment & Features */}
          <div className="space-y-2">
            <h3 className="font-medium text-sm dark:text-white">
              {t('paymentMethods')}
            </h3>
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant="outline"
                className="gap-1 dark:border-gray-600 dark:text-gray-300"
              >
                <CreditCard className="w-3 h-3" />
                {dir === 'rtl' ? 'כרטיס אשראי' : 'Credit Card'}
              </Badge>
              {parking.pango && (
                <Badge
                  variant="outline"
                  className="gap-1 dark:border-gray-600 dark:text-gray-300"
                >
                  {t('pango')}
                </Badge>
              )}
              {parking.celloPark && (
                <Badge
                  variant="outline"
                  className="gap-1 dark:border-gray-600 dark:text-gray-300"
                >
                  {t('celloPark')}
                </Badge>
              )}
              {parking.accessibility && (
                <Badge
                  variant="outline"
                  className="gap-1 dark:border-gray-600 dark:text-gray-300"
                >
                  <Accessibility className="w-3 h-3" />
                  {t('accessibility')}
                </Badge>
              )}
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button className="gap-2" onClick={openWaze}>
              <ExternalLink className="w-4 h-4" />
              {t('navigate')}
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={openGoogleMaps}
            >
              <Navigation className="w-4 h-4" />
              {t('checkRoute')}
            </Button>
          </div>

          {/* Report Price */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Camera className="w-4 h-4" />
                {t('reportPrice')}
              </Button>
            </DialogTrigger>
            <DialogContent dir={dir} className="dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="dark:text-white">
                  {t('reportPrice')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder={
                    dir === 'rtl'
                      ? 'תאר את ההבדל במחיר...'
                      : 'Describe the price difference...'
                  }
                  dir={dir}
                  className="dark:bg-gray-900 dark:text-white"
                />
                <Button className="w-full gap-2">
                  <Camera className="w-4 h-4" />
                  {t('addPhoto')}
                </Button>
                <Button className="w-full">{t('submit')}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </Card>

        {/* Reviews */}
        <div className="space-y-3">
          <h3 className="font-medium dark:text-white">{t('reviews')}</h3>
          {parking.reviews.map((review) => (
            <Card
              key={review.id}
              className="p-4 space-y-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="dark:bg-gray-700 dark:text-white">
                      {review.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm dark:text-white">
                      {review.user}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {review.comment}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
