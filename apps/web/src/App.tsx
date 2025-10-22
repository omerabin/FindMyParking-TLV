import { useState } from 'react';
import { Map, List, ArrowUpDown } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { MapView } from './components/MapView';
import { ParkingListItem } from './components/ParkingList';
import { ParkingDetails } from './components/ParkingDetails';
import { OwnerDashboard } from './components/OwnerDashboard';
import { EmptyState } from './components/EmptyState';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';

interface ParkingLot {
  id: number;
  name: string;
  address: string;
  price: number;
  priceDaily: number;
  priceMonthly?: number;
  distance: number;
  rating: number;
  reviewCount: number;
  type: 'covered' | 'open' | 'secure';
  lat: number;
  lng: number;
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
}

const mockParkingLotsHe: ParkingLot[] = [
  {
    id: 1,
    name: 'חניון הבימה',
    address: 'רחוב הבימה 5, תל אביב',
    price: 8,
    priceDaily: 80,
    priceMonthly: 1200,
    distance: 150,
    rating: 4.5,
    reviewCount: 128,
    type: 'covered',
    lat: 32.0731,
    lng: 34.7798,
    hours: '24/7',
    phone: '03-1234567',
    accessibility: true,
    pango: true,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'דני כהן',
        rating: 5,
        comment: 'חניון מצוין! נקי ומאובטח. המחיר הכי זול באזור.',
        date: '15/10/2025',
      },
      {
        id: 2,
        user: 'שרה לוי',
        rating: 4,
        comment: 'חניון טוב, אבל לפעמים קשה למצוא מקום בשעות העומס.',
        date: '12/10/2025',
      },
    ],
  },
  {
    id: 2,
    name: 'חניון דיזנגוף סנטר',
    address: 'דיזנגוף 50, תל אביב',
    price: 25,
    priceDaily: 200,
    priceMonthly: 3000,
    distance: 450,
    rating: 4.2,
    reviewCount: 342,
    type: 'covered',
    lat: 32.0757,
    lng: 34.7746,
    hours: '08:00-23:00',
    phone: '03-2345678',
    accessibility: true,
    pango: true,
    celloPark: false,
    reviews: [
      {
        id: 1,
        user: 'מיכל אברהם',
        rating: 4,
        comment: 'נוח למרכז הקניות, אבל קצת יקר.',
        date: '14/10/2025',
      },
      {
        id: 2,
        user: 'יוסי חיים',
        rating: 5,
        comment: 'חניון מעולה עם הרבה מקומות. שירות מצוין!',
        date: '10/10/2025',
      },
    ],
  },
  {
    id: 3,
    name: 'חניון שוק הכרמל',
    address: 'אלנבי 45, תל אביב',
    price: 12,
    priceDaily: 100,
    priceMonthly: 1500,
    distance: 280,
    rating: 3.8,
    reviewCount: 89,
    type: 'open',
    lat: 32.0675,
    lng: 34.7698,
    hours: '06:00-22:00',
    phone: '03-3456789',
    accessibility: false,
    pango: true,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'רון שמש',
        rating: 4,
        comment: 'מחיר סביר, קרוב לשוק. מומלץ!',
        date: '13/10/2025',
      },
      {
        id: 2,
        user: 'נועה גולן',
        rating: 3,
        comment: 'חניון בסדר, אבל לא מקורה.',
        date: '11/10/2025',
      },
    ],
  },
  {
    id: 4,
    name: 'חניון הירקון',
    address: 'הירקון 120, תל אביב',
    price: 15,
    priceDaily: 120,
    priceMonthly: 1800,
    distance: 520,
    rating: 4.3,
    reviewCount: 156,
    type: 'secure',
    lat: 32.0823,
    lng: 34.769,
    hours: '24/7',
    phone: '03-4567890',
    accessibility: true,
    pango: false,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'אלי מזרחי',
        rating: 5,
        comment: 'חניון מאובטח עם שמירה 24/7. מרגיש בטוח!',
        date: '16/10/2025',
      },
      {
        id: 2,
        user: 'תמר כץ',
        rating: 4,
        comment: 'חניון טוב, קצת רחוק מהמרכז.',
        date: '09/10/2025',
      },
    ],
  },
  {
    id: 5,
    name: 'חניון רוטשילד',
    address: 'רוטשילד 88, תל אביב',
    price: 10,
    priceDaily: 90,
    priceMonthly: 1400,
    distance: 320,
    rating: 4.6,
    reviewCount: 203,
    type: 'covered',
    lat: 32.0656,
    lng: 34.7768,
    hours: '24/7',
    phone: '03-5678901',
    accessibility: true,
    pango: true,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'גיא פרידמן',
        rating: 5,
        comment: 'מחיר מעולה! החניון הכי טוב ברוטשילד.',
        date: '15/10/2025',
      },
      {
        id: 2,
        user: 'ליאת ברק',
        rating: 5,
        comment: 'תמיד נקי ומסודר. שירות אדיב.',
        date: '14/10/2025',
      },
    ],
  },
  {
    id: 6,
    name: 'חניון קניון TLV',
    address: 'מנחם בגין 132, תל אביב',
    price: 20,
    priceDaily: 180,
    priceMonthly: 2500,
    distance: 680,
    rating: 4.1,
    reviewCount: 278,
    type: 'covered',
    lat: 32.0715,
    lng: 34.7873,
    hours: '09:00-23:00',
    phone: '03-6789012',
    accessibility: true,
    pango: true,
    celloPark: false,
    reviews: [
      {
        id: 1,
        user: 'אורי דוד',
        rating: 4,
        comment: 'חניון גדול ונוח. קצת יקר אבל שווה את זה.',
        date: '12/10/2025',
      },
      {
        id: 2,
        user: 'מאיה לב',
        rating: 4,
        comment: 'חניון מרווח עם הרבה מקומות פנויים.',
        date: '08/10/2025',
      },
    ],
  },
];

const mockParkingLotsEn: ParkingLot[] = [
  {
    id: 1,
    name: 'Habima Parking',
    address: '5 Habima St, Tel Aviv',
    price: 8,
    priceDaily: 80,
    priceMonthly: 1200,
    distance: 150,
    rating: 4.5,
    reviewCount: 128,
    type: 'covered',
    lat: 32.0731,
    lng: 34.7798,
    hours: '24/7',
    phone: '03-1234567',
    accessibility: true,
    pango: true,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'Danny Cohen',
        rating: 5,
        comment: 'Excellent parking! Clean and secure. Best price in the area.',
        date: '15/10/2025',
      },
      {
        id: 2,
        user: 'Sarah Levy',
        rating: 4,
        comment:
          'Good parking, but sometimes hard to find a spot during peak hours.',
        date: '12/10/2025',
      },
    ],
  },
  {
    id: 2,
    name: 'Dizengoff Center Parking',
    address: '50 Dizengoff St, Tel Aviv',
    price: 25,
    priceDaily: 200,
    priceMonthly: 3000,
    distance: 450,
    rating: 4.2,
    reviewCount: 342,
    type: 'covered',
    lat: 32.0757,
    lng: 34.7746,
    hours: '08:00-23:00',
    phone: '03-2345678',
    accessibility: true,
    pango: true,
    celloPark: false,
    reviews: [
      {
        id: 1,
        user: 'Michal Abraham',
        rating: 4,
        comment: 'Convenient for the mall, but a bit expensive.',
        date: '14/10/2025',
      },
      {
        id: 2,
        user: 'Yossi Haim',
        rating: 5,
        comment: 'Excellent parking with lots of spaces. Great service!',
        date: '10/10/2025',
      },
    ],
  },
  {
    id: 3,
    name: 'Carmel Market Parking',
    address: '45 Allenby St, Tel Aviv',
    price: 12,
    priceDaily: 100,
    priceMonthly: 1500,
    distance: 280,
    rating: 3.8,
    reviewCount: 89,
    type: 'open',
    lat: 32.0675,
    lng: 34.7698,
    hours: '06:00-22:00',
    phone: '03-3456789',
    accessibility: false,
    pango: true,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'Ron Shemesh',
        rating: 4,
        comment: 'Reasonable price, close to the market. Recommended!',
        date: '13/10/2025',
      },
      {
        id: 2,
        user: 'Noa Golan',
        rating: 3,
        comment: 'Okay parking, but not covered.',
        date: '11/10/2025',
      },
    ],
  },
  {
    id: 4,
    name: 'Hayarkon Parking',
    address: '120 Hayarkon St, Tel Aviv',
    price: 15,
    priceDaily: 120,
    priceMonthly: 1800,
    distance: 520,
    rating: 4.3,
    reviewCount: 156,
    type: 'secure',
    lat: 32.0823,
    lng: 34.769,
    hours: '24/7',
    phone: '03-4567890',
    accessibility: true,
    pango: false,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'Eli Mizrahi',
        rating: 5,
        comment: 'Secure parking with 24/7 security. Feel safe!',
        date: '16/10/2025',
      },
      {
        id: 2,
        user: 'Tamar Katz',
        rating: 4,
        comment: 'Good parking, a bit far from center.',
        date: '09/10/2025',
      },
    ],
  },
  {
    id: 5,
    name: 'Rothschild Parking',
    address: '88 Rothschild Blvd, Tel Aviv',
    price: 10,
    priceDaily: 90,
    priceMonthly: 1400,
    distance: 320,
    rating: 4.6,
    reviewCount: 203,
    type: 'covered',
    lat: 32.0656,
    lng: 34.7768,
    hours: '24/7',
    phone: '03-5678901',
    accessibility: true,
    pango: true,
    celloPark: true,
    reviews: [
      {
        id: 1,
        user: 'Guy Friedman',
        rating: 5,
        comment: 'Excellent price! Best parking on Rothschild.',
        date: '15/10/2025',
      },
      {
        id: 2,
        user: 'Liat Barak',
        rating: 5,
        comment: 'Always clean and organized. Friendly service.',
        date: '14/10/2025',
      },
    ],
  },
  {
    id: 6,
    name: 'TLV Mall Parking',
    address: '132 Menachem Begin Rd, Tel Aviv',
    price: 20,
    priceDaily: 180,
    priceMonthly: 2500,
    distance: 680,
    rating: 4.1,
    reviewCount: 278,
    type: 'covered',
    lat: 32.0715,
    lng: 34.7873,
    hours: '09:00-23:00',
    phone: '03-6789012',
    accessibility: true,
    pango: true,
    celloPark: false,
    reviews: [
      {
        id: 1,
        user: 'Uri David',
        rating: 4,
        comment: 'Large and convenient. A bit pricey but worth it.',
        date: '12/10/2025',
      },
      {
        id: 2,
        user: 'Maya Lev',
        rating: 4,
        comment: 'Spacious parking with many available spots.',
        date: '08/10/2025',
      },
    ],
  },
];

const AppContent = () => {
  const { t, dir, language } = useLanguage();

  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    'covered',
    'open',
    'secure',
  ]);
  const [maxDistance, setMaxDistance] = useState(2000);
  const [sortBy, setSortBy] = useState<'price' | 'distance'>('price');
  const [selectedParking, setSelectedParking] = useState<number | null>(null);
  const [showOwnerDashboard, setShowOwnerDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [isLoading, setIsLoading] = useState(false);

  // Use language-specific data
  const mockParkingLots =
    language === 'he' ? mockParkingLotsHe : mockParkingLotsEn;

  // Filter and sort parking lots
  const filteredLots = mockParkingLots
    .filter(
      (lot) =>
        lot.price >= priceRange[0] &&
        lot.price <= priceRange[1] &&
        selectedTypes.includes(lot.type) &&
        lot.distance <= maxDistance
    )
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return a.distance - b.distance;
    });

  const handleParkingSelect = (id: number) => {
    setSelectedParking(id);
  };

  const handleBack = () => {
    setSelectedParking(null);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 50]);
    setSelectedTypes(['covered', 'open', 'secure']);
    setMaxDistance(2000);
  };

  // Show owner dashboard
  if (showOwnerDashboard) {
    return <OwnerDashboard onClose={() => setShowOwnerDashboard(false)} />;
  }

  // Show parking details
  if (selectedParking !== null) {
    const parking = mockParkingLots.find((p) => p.id === selectedParking);
    if (parking) {
      return <ParkingDetails parking={parking} onBack={handleBack} />;
    }
  }

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900" dir={dir}>
      {/* Header */}
      <Header onOwnerDashboardClick={() => setShowOwnerDashboard(true)} />

      {/* Search Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 shadow-md">
        <div className="container mx-auto max-w-4xl">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            onClear={() => setSearchValue('')}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="border-b dark:border-gray-800 bg-white dark:bg-gray-900 p-3 shadow-sm">
        <div className="container mx-auto max-w-4xl flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <FilterPanel
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedTypes={selectedTypes}
              onTypesChange={setSelectedTypes}
              maxDistance={maxDistance}
              onMaxDistanceChange={setMaxDistance}
              onClearFilters={handleClearFilters}
            />

            <Select
              value={sortBy}
              onValueChange={(value: 'price' | 'distance') => setSortBy(value)}
            >
              <SelectTrigger className="w-40 dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent dir={dir} className="dark:bg-gray-800">
                <SelectItem value="price" className="cursor-pointer">
                  {t('sortByPrice')}
                </SelectItem>
                <SelectItem value="distance" className="cursor-pointer">
                  {t('sortByDistance')}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredLots.length} {t('lotCount')}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto max-w-4xl h-full">
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredLots.length === 0 ? (
            <EmptyState type="no-results" onRetry={handleClearFilters} />
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="h-full flex flex-col"
            >
              <TabsList className="w-full grid grid-cols-2 rounded-none">
                <TabsTrigger value="map" className="gap-2 cursor-pointer">
                  <Map className="w-4 h-4" />
                  {t('map')}
                </TabsTrigger>
                <TabsTrigger value="list" className="gap-2 cursor-pointer">
                  <List className="w-4 h-4" />
                  {t('list')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="flex-1 m-0 p-0">
                <MapView
                  parkingLots={filteredLots}
                  onParkingSelect={handleParkingSelect}
                />
              </TabsContent>

              <TabsContent
                value="list"
                className="flex-1 m-0 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900"
              >
                {filteredLots.map((lot) => (
                  <ParkingListItem
                    key={lot.id}
                    id={lot.id}
                    name={lot.name}
                    address={lot.address}
                    price={lot.price}
                    distance={lot.distance}
                    rating={lot.rating}
                    reviewCount={lot.reviewCount}
                    type={lot.type}
                    accessibility={lot.accessibility}
                    pango={lot.pango}
                    celloPark={lot.celloPark}
                    onClick={() => handleParkingSelect(lot.id)}
                  />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
