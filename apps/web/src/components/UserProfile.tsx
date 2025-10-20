import {
  ChevronRight,
  Heart,
  History,
  Settings,
  Bell,
  Globe,
  Moon,
} from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

interface UserProfileProps {
  onClose: () => void;
}

export function UserProfile({ onClose }: UserProfileProps) {
  const { t, dir, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const favoriteParking = [
    { id: 1, name: 'חניון הבימה', address: 'רחוב הבימה 5, תל אביב', price: 8 },
    { id: 2, name: 'חניון רוטשילד', address: 'רוטשילד 88, תל אביב', price: 10 },
  ];

  const recentSearches = [
    { id: 1, destination: 'דיזנגוף סנטר', date: '19/10/2025' },
    { id: 2, destination: 'שוק הכרמל', date: '18/10/2025' },
    { id: 3, destination: 'נמל תל אביב', date: '17/10/2025' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900" dir={dir}>
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <h2 className="text-xl">{t('profile')}</h2>
        </div>
      </div>

      {/* User Info */}
      <div className="p-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
            U
          </div>
          <div>
            <h3 className="text-xl font-medium dark:text-white">
              {dir === 'rtl' ? 'משתמש' : 'User'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              user@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="w-full grid grid-cols-3 rounded-none">
            <TabsTrigger value="favorites">
              <Heart className="w-4 h-4 mr-2" />
              {t('favorites')}
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="w-4 h-4 mr-2" />
              {t('history')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              {t('settings')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="favorites" className="p-4 space-y-3">
            <h3 className="font-medium mb-3 dark:text-white">
              {t('favorites')}
            </h3>
            {favoriteParking.map((parking) => (
              <Card key={parking.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {parking.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {parking.address}
                    </p>
                  </div>
                  <span className="text-blue-600 font-medium">
                    ₪{parking.price}/{t('hourly')}
                  </span>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="p-4 space-y-3">
            <h3 className="font-medium mb-3 dark:text-white">{t('history')}</h3>
            {recentSearches.map((search) => (
              <Card key={search.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium dark:text-white">
                      {search.destination}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {search.date}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="settings" className="p-4">
            <Card className="p-4 space-y-4">
              <h3 className="font-medium mb-3 dark:text-white">
                {t('settings')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <Label>{t('language')}</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={language === 'he' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage('he')}
                    >
                      עברית
                    </Button>
                    <Button
                      variant={language === 'en' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setLanguage('en')}
                    >
                      English
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-gray-500" />
                    <Label>{t('darkMode')}</Label>
                  </div>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={toggleTheme}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <Label>{t('notifications')}</Label>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
