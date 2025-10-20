import { SlidersHorizontal, Umbrella, Sun, Shield } from 'lucide-react';
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

interface FilterPanelProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  selectedTypes: string[];
  onTypesChange: (types: string[]) => void;
  maxDistance: number;
  onMaxDistanceChange: (distance: number) => void;
}

export function FilterPanel({
  priceRange,
  onPriceRangeChange,
  selectedTypes,
  onTypesChange,
  maxDistance,
  onMaxDistanceChange,
}: FilterPanelProps) {
  const parkingTypes = [
    { id: 'covered', label: 'מקורה', icon: Umbrella },
    { id: 'open', label: 'פתוח', icon: Sun },
    { id: 'secure', label: 'מאובטח', icon: Shield },
  ];

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypesChange([...selectedTypes, type]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          סינון
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md" dir="rtl">
        <SheetHeader>
          <SheetTitle>סינון חניונים</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label>טווח מחירים (לשעה)</Label>
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
            <div className="flex justify-between text-sm text-gray-600">
              <span>₪{priceRange[1]}</span>
              <span>₪{priceRange[0]}</span>
            </div>
          </div>

          {/* Parking Type */}
          <div className="space-y-3">
            <Label>סוג חניה</Label>
            <div className="space-y-2">
              {parkingTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <div key={type.id} className="flex items-center gap-2">
                    <Checkbox
                      id={type.id}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={() => toggleType(type.id)}
                    />
                    <label
                      htmlFor={type.id}
                      className="flex items-center gap-2 cursor-pointer flex-1"
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
            <Label>מרחק מקסימלי</Label>
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
            <div className="text-sm text-gray-600 text-center">
              עד {maxDistance} מטר
            </div>
          </div>

          <Button className="w-full" variant="default">
            החל סינון
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
