import { useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { Map, List, ArrowUpDown } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { MapView } from './components/MapView';
import { ParkingListItem } from './components/ParkingList';
import { ParkingDetails } from './components/ParkingDetails';
import { OwnerDashboard } from './components/OwnerDashboard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import OwnerLogin from './components/OwnerLogin';
import { UnifiedParking } from '@shared/db';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { fetchParkings } from './api/parkings';
import { getParkingPriceDetails } from './utils/priceProcess';

const AppContent = () => {
  const navigate = useNavigate();
  const { t, dir, language } = useLanguage();

  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [maxDistance, setMaxDistance] = useState(2000);
  const [sortBy, setSortBy] = useState<'price' | 'distance'>('price');
  const [activeTab, setActiveTab] = useState('map');
  const [isOwnerLoginShown, setIsOwnerLoginShown] = useState(false);
  const {
    data: parkings,
    isLoading,
    isError,
  } = useQuery<UnifiedParking[]>({
    queryKey: ['parkings'],
    queryFn: fetchParkings,
  });
  const ParkingDetailsRoute = () => {
    const { id } = useParams();
    const parkingId = id ? Number(id) : null;
    if (parkingId === null)
      return <div className="p-4">Invalid parking id</div>;
    const parking = (parkings || []).find(
      (parking) => parking._id === parkingId
    );
    if (!parking)
      return (
        <div className="p-4">{t('parkingNotFound') || 'Parking not found'}</div>
      );
    return <ParkingDetails parking={parking} onBack={() => navigate(-1)} />;
  };

  const OwnerDashboardRoute = () => {
    return <OwnerDashboard onClose={() => navigate('/')} />;
  };

  const handleParkingSelect = (id: number) => {
    navigate(`/parking/${id}`);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 50]);
    setMaxDistance(2000);
  };

  // Prepare main UI so it can be used as the root route element
  const mainUI = (
    <div className="h-screen flex flex-col bg-white dark:bg-gray-900" dir={dir}>
      {/* Header */}
      <Header onOwnerDashboardClick={() => setIsOwnerLoginShown(true)} />

      {/* Search Section */}
      <div
        className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 shadow-md
        dark:from-gray-800 dark:to-gray-900"
      >
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
            {(parkings || []).length} {t('lotCount')}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="container mx-auto max-w-4xl h-full">
          {isLoading ? (
            <LoadingSpinner />
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
                  parkingLots={parkings || []}
                  onParkingSelect={handleParkingSelect}
                />
              </TabsContent>

              <TabsContent
                value="list"
                className="flex-1 m-0 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900"
              >
                {(parkings || []).map((lot) => (
                  <ParkingListItem
                    key={lot.id}
                    id={lot.id}
                    name={lot.name}
                    address={`${lot.address?.city} ${lot.address?.street ?? ''} ${lot.address?.buildingNumber ?? ''}`}
                    price={getParkingPriceDetails(lot).firstHour}
                    // distance={lot.distance}
                    // rating={lot.rating}
                    // reviewCount={lot.reviewCount}
                    // accessibility={lot.accessibility}
                    // pango={lot.pango}
                    // celloPark={lot.celloPark}
                    onClick={() => handleParkingSelect(lot.id)}
                  />
                ))}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
      {isOwnerLoginShown && (
        <OwnerLogin setIsOwnerLoginShown={setIsOwnerLoginShown} />
      )}
    </div>
  );

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={mainUI} />
        <Route path="/parking/:id" element={<ParkingDetailsRoute />} />
        <Route path="/owner" element={<OwnerDashboardRoute />} />
      </Routes>
    </ErrorBoundary>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
