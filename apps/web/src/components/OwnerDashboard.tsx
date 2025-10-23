import { useState } from 'react';
import {
  Building2,
  Plus,
  Edit,
  TrendingUp,
  Eye,
  Star,
  ChevronRight,
  Upload,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface OwnerDashboardProps {
  onClose: () => void;
}

export const OwnerDashboard = ({ onClose }: OwnerDashboardProps) => {
  const { t, dir } = useLanguage();
  const [uploadedPriceImage, setUploadedPriceImage] = useState<string | null>(
    null
  );

  const ownerLots = [
    {
      id: 1,
      name: dir === 'rtl' ? 'חניון הבימה' : 'Habima Parking',
      address:
        dir === 'rtl' ? 'רחוב הבימה 5, תל אביב' : '5 Habima St, Tel Aviv',
      currentPrice: 15,
      entranceFee: 5,
      spots: 120,
      occupied: 87,
      searches: 342,
      visits: 156,
      rating: 4.5,
    },
    {
      id: 2,
      name: dir === 'rtl' ? 'חניון דיזנגוף סנטר' : 'Dizengoff Center Parking',
      address:
        dir === 'rtl' ? 'דיזנגוף 50, תל אביב' : '50 Dizengoff St, Tel Aviv',
      currentPrice: 25,
      entranceFee: 10,
      spots: 200,
      occupied: 156,
      searches: 567,
      visits: 289,
      rating: 4.2,
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPriceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedPriceImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900" dir={dir}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <Building2 className="w-6 h-6" />
            <h1 className="text-xl">{t('OwnerDashboardScreenTitle')}</h1>
          </div>
        </div>
        <p className="text-blue-100 text-sm">
          {dir === 'rtl'
            ? 'נהל את החניונים שלך ועדכן מחירים בזמן אמת'
            : 'Manage your parking lots and update prices in real-time'}
        </p>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-120px)] p-4">
        <Tabs defaultValue="lots" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="lots">{t('myLots')}</TabsTrigger>
            <TabsTrigger value="add">{t('addNewLot')}</TabsTrigger>
          </TabsList>

          <TabsContent value="lots" className="space-y-4">
            {ownerLots.map((lot) => {
              const occupancyRate = (lot.occupied / lot.spots) * 100;
              return (
                <Card
                  key={lot.id}
                  className="p-4 space-y-4 dark:bg-gray-800 dark:border-gray-700"
                >
                  <div
                    className={`flex items-start ${
                      dir === 'rtl'
                        ? 'flex-row justify-start'
                        : 'flex-row justify-between'
                    }`}
                  >
                    <div
                      className={`space-y-1 flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                    >
                      <h3 className="font-medium dark:text-white">
                        {lot.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lot.address}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className={dir === 'rtl' ? 'ml-auto' : 'ml-auto mr-0'}
                    >
                      <Edit />
                      {t('editLot')}
                    </Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center p-3 bg-orange-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                        ₪{lot.entranceFee}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {dir === 'rtl' ? 'כניסה' : 'Entry'}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        ₪{lot.currentPrice}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {dir === 'rtl' ? 'לשעה' : '/hour'}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-lg font-semibold dark:text-white">
                        {lot.occupied}/{lot.spots}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {t('occupied')}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {occupancyRate.toFixed(0)}%
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {dir === 'rtl' ? 'תפוסה' : 'Full'}
                      </div>
                    </div>
                  </div>

                  {/* Analytics */}
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div
                      className={`flex items-center gap-1 text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>
                        {lot.searches} {t('searches')}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <Eye className="w-4 h-4" />
                      <span>
                        {lot.visits} {t('visits')}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-gray-600 dark:text-gray-400 ${dir === 'rtl' ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{lot.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Update Prices */}
                  <div className="space-y-3 pt-2 border-t dark:border-gray-700">
                    <Label className="dark:text-white" dir={dir}>
                      {t('updatePrice')}
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <Label
                          htmlFor={`entrance-${lot.id}`}
                          className="text-xs text-gray-600 dark:text-gray-400"
                          dir={dir}
                        >
                          {dir === 'rtl' ? 'דמי כניסה (₪)' : 'Entrance Fee (₪)'}
                        </Label>
                        <Input
                          id={`entrance-${lot.id}`}
                          type="number"
                          defaultValue={lot.entranceFee}
                          className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                          dir={dir}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor={`hourly-${lot.id}`}
                          className="text-xs text-gray-600 dark:text-gray-400"
                          dir={dir}
                        >
                          {dir === 'rtl' ? 'מחיר לשעה (₪)' : 'Hourly Rate (₪)'}
                        </Label>
                        <Input
                          id={`hourly-${lot.id}`}
                          type="number"
                          defaultValue={lot.currentPrice}
                          className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                          dir={dir}
                        />
                      </div>
                    </div>
                    <Button className="w-full">{t('update')}</Button>
                  </div>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="add">
            <Card className="p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700 r">
              <h3 className="font-medium dark:text-white text-center mx-auto">
                {t('addNewLot')}
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-white" dir={dir}>
                    {t('lotName')}
                  </Label>
                  <Input
                    id="name"
                    placeholder={
                      dir === 'rtl'
                        ? 'לדוגמה: חניון הבימה'
                        : 'e.g., Habima Parking'
                    }
                    dir={dir}
                    className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="dark:text-white"
                    dir={dir}
                  >
                    {t('address')}
                  </Label>
                  <Input
                    id="address"
                    placeholder={
                      dir === 'rtl'
                        ? 'רחוב ומספר, עיר'
                        : 'Street and number, city'
                    }
                    dir={dir}
                    className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spots" className="dark:text-white" dir={dir}>
                    {t('capacity')}
                  </Label>
                  <Input
                    id="spots"
                    type="number"
                    placeholder="100"
                    dir={dir}
                    className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="dark:text-white" dir={dir}>
                    {t('parkingType')}
                  </Label>
                  <Select>
                    <SelectTrigger
                      id="type"
                      className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                    >
                      <SelectValue placeholder={t('parkingType')} />
                    </SelectTrigger>
                    <SelectContent dir={dir} className="dark:bg-gray-900">
                      <SelectItem value="covered">{t('covered')}</SelectItem>
                      <SelectItem value="open">{t('open')}</SelectItem>
                      <SelectItem value="secure">{t('secure')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours" className="dark:text-white" dir={dir}>
                    {t('hours')}
                  </Label>
                  <Input
                    id="hours"
                    placeholder="24/7"
                    dir={dir}
                    className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="dark:text-white" dir={dir}>
                    {t('phone')}
                  </Label>
                  <Input
                    id="phone"
                    placeholder="03-1234567"
                    dir={dir}
                    className="dark:bg-gray-900 dark:text-white dark:border-gray-700"
                  />
                </div>

                {/* Parking Price Image Upload */}
                <div className="space-y-3 pt-2 border-t dark:border-gray-700">
                  <Label className="dark:text-white" dir={dir}>
                    {dir === 'rtl'
                      ? 'תמונת מחירון חניה'
                      : 'Parking Prices Picture'}
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {dir === 'rtl'
                      ? 'העלה תמונה של שלט המחירים בחניון'
                      : 'Upload a picture of the parking price sign'}
                  </p>

                  {uploadedPriceImage ? (
                    <div className="relative">
                      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                        <img
                          src={uploadedPriceImage}
                          alt="Price sign"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 rounded-full w-8 h-8 p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="price-image-upload"
                      />
                      <label htmlFor="price-image-upload">
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors">
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {dir === 'rtl'
                                  ? 'לחץ להעלאת תמונה'
                                  : 'Click to upload image'}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                PNG, JPG, JPEG {dir === 'rtl' ? 'עד' : 'up to'}{' '}
                                5MB
                              </p>
                            </div>
                            <Upload className="w-5 h-5 text-gray-400" />
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                <Button className="w-full gap-2" disabled={!uploadedPriceImage}>
                  <Plus className="w-4 h-4" />
                  {t('add')}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
