import { SlidersHorizontal, Umbrella, Sun, Shield, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { useLanguage } from '../contexts/LanguageContext';

interface FilterPanelProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  maxDistance: number;
  onMaxDistanceChange: (distance: number) => void;
  onClearFilters: () => void;
}

export const FilterPanel = ({
  priceRange,
  onPriceRangeChange,
  maxDistance,
  onMaxDistanceChange,
  onClearFilters,
}: FilterPanelProps) => {
  const { t, dir } = useLanguage();

  const parkingTypes = [
    { id: 'covered', label: t('covered'), icon: Umbrella },
    { id: 'open', label: t('open'), icon: Sun },
    { id: 'secure', label: t('secure'), icon: Shield },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          {t('filter')}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={dir === 'rtl' ? 'right' : 'left'}
        className="w-full sm:max-w-md dark:bg-gray-900"
        dir={dir}
      >
        <SheetHeader>
          <SheetTitle className="dark:text-white">{t('filter')}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="dark:text-white">{t('priceRange')}</Label>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={(value) =>
                  onPriceRangeChange(value as [number, number])
                }
                min={0}
                max={50}
                step={5}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>₪{priceRange[dir === 'rtl' ? 1 : 0]}</span>
              <span>₪{priceRange[dir === 'rtl' ? 0 : 1]}</span>
            </div>
          </div>

          {/* Parking Type */}
          <div className="space-y-3">
            <Label className="dark:text-white">{t('parkingType')}</Label>
            <div className="space-y-2">
              {parkingTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id} className="flex items-center gap-2">
                    <Checkbox id={type.id} />
                    <label
                      htmlFor={type.id}
                      className="flex items-center gap-2 cursor-pointer flex-1 dark:text-gray-300"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{type.label}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Distance */}
          <div className="space-y-3">
            <Label className="dark:text-white">{t('maxDistance')}</Label>
            <div className="px-2">
              <Slider
                value={[maxDistance]}
                onValueChange={(value) => onMaxDistanceChange(value[0])}
                min={100}
                max={2000}
                step={100}
                className="w-full"
              />
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              {dir === 'rtl'
                ? `עד ${maxDistance} מטר`
                : `Up to ${maxDistance} meters`}
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" variant="default">
              {t('applyFilters')}
            </Button>
            <Button variant="outline" size="icon" onClick={onClearFilters}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
