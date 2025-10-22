import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Language = 'he' | 'en';

interface Translations {
  [key: string]: {
    he: string;
    en: string;
  };
}

const translations: Translations = {
  // App name
  appName: { he: 'FindMyParking TLV', en: 'FindMyParking TLV' },
  appTagline: { he: 'מצא חניה בתל אביב', en: 'Find Parking in Tel Aviv' },

  // Navigation
  home: { he: 'בית', en: 'Home' },
  map: { he: 'מפה', en: 'Map' },
  list: { he: 'רשימה', en: 'List' },
  profile: { he: 'פרופיל', en: 'Profile' },
  login: { he: 'התחבר', en: 'Login' },
  signup: { he: 'הרשם', en: 'Sign Up' },
  logout: { he: 'התנתק', en: 'Logout' },

  // Search & Filters
  searchPlaceholder: {
    he: 'חפש יעד בתל אביב...',
    en: 'Search destination in Tel Aviv...',
  },
  filter: { he: 'סינון', en: 'Filter' },
  sort: { he: 'מיון', en: 'Sort' },
  sortByPrice: { he: 'מחיר נמוך', en: 'Lowest Price' },
  sortByDistance: { he: 'מרחק קצר', en: 'Shortest Distance' },
  applyFilters: { he: 'החל סינון', en: 'Apply Filters' },
  clearFilters: { he: 'נקה סינון', en: 'Clear Filters' },

  // Filter options
  priceRange: { he: 'טווח מחירים', en: 'Price Range' },
  parkingType: { he: 'סוג חניה', en: 'Parking Type' },
  maxDistance: { he: 'מרחק מקסימלי', en: 'Max Distance' },
  covered: { he: 'מקורה', en: 'Covered' },
  open: { he: 'פתוח', en: 'Open' },
  secure: { he: 'מאובטח', en: 'Secure' },

  // Parking details
  moreDetails: { he: 'פרטים נוספים', en: 'More Details' },
  hourly: { he: 'לשעה', en: '/hour' },
  daily: { he: 'ליום', en: '/day' },
  monthly: { he: 'לחודש', en: '/month' },
  distance: { he: 'מרחק', en: 'Distance' },
  meters: { he: 'מטר', en: 'meters' },
  rating: { he: 'דירוג', en: 'Rating' },
  reviews: { he: 'ביקורות', en: 'Reviews' },

  // Actions
  navigate: { he: 'ניווט לחניון', en: 'Navigate to Lot' },
  checkRoute: { he: 'בדוק הליכה ליעד', en: 'Check Walking Route' },
  reportPrice: { he: 'דווח על מחיר שונה', en: 'Report Different Price' },
  addPhoto: { he: 'הוסף תמונה', en: 'Add Photo' },

  // Payment & Accessibility
  paymentMethods: { he: 'אמצעי תשלום', en: 'Payment Methods' },
  accessibility: { he: 'נגישות', en: 'Accessibility' },
  pango: { he: 'Pango', en: 'Pango' },
  celloPark: { he: 'CelloPark', en: 'CelloPark' },

  // Owner Dashboard
  ownerDashboard: { he: 'פאנל בעלי חניונים', en: 'Owner Dashboard' },
  myLots: { he: 'החניונים שלי', en: 'My Parking Lots' },
  addNewLot: { he: 'הוסף חניון חדש', en: 'Add New Lot' },
  editLot: { he: 'ערוך', en: 'Edit' },
  updatePrice: { he: 'עדכן מחיר', en: 'Update Price' },
  analytics: { he: 'ניתוח נתונים', en: 'Analytics' },
  searches: { he: 'חיפושים', en: 'Searches' },
  visits: { he: 'ביקורים', en: 'Visits' },

  // Auth
  email: { he: 'אימייל', en: 'Email' },
  password: { he: 'סיסמה', en: 'Password' },
  confirmPassword: { he: 'אימות סיסמה', en: 'Confirm Password' },
  name: { he: 'שם', en: 'Name' },
  phone: { he: 'טלפון', en: 'Phone' },
  userType: { he: 'סוג משתמש', en: 'User Type' },
  parkingFinder: { he: 'מחפש חניה', en: 'Parking Finder' },
  lotOwner: { he: 'בעל חניון', en: 'Lot Owner' },

  // Profile
  settings: { he: 'הגדרות', en: 'Settings' },
  history: { he: 'היסטוריה', en: 'History' },
  favorites: { he: 'מועדפים', en: 'Favorites' },
  notifications: { he: 'התראות', en: 'Notifications' },
  language: { he: 'שפה', en: 'Language' },
  theme: { he: 'ערכת נושא', en: 'Theme' },
  lightMode: { he: 'מצב בהיר', en: 'Light Mode' },
  darkMode: { he: 'מצב כהה', en: 'Dark Mode' },

  // Empty states
  noResults: {
    he: 'לא נמצאו חניונים באזור זה',
    en: 'No parking lots found nearby',
  },
  tryAgain: { he: 'נסה שוב', en: 'Try Again' },
  loading: { he: 'טוען...', en: 'Loading...' },
  offline: { he: 'אתה במצב לא מקוון', en: 'You are offline' },

  // Form fields
  lotName: { he: 'שם החניון', en: 'Lot Name' },
  address: { he: 'כתובת', en: 'Address' },
  pricePerHour: { he: 'מחיר לשעה', en: 'Price per Hour' },
  capacity: { he: 'מספר מקומות', en: 'Capacity' },
  hours: { he: 'שעות פעילות', en: 'Operating Hours' },

  // Common
  save: { he: 'שמור', en: 'Save' },
  cancel: { he: 'ביטול', en: 'Cancel' },
  close: { he: 'סגור', en: 'Close' },
  back: { he: 'חזור', en: 'Back' },
  submit: { he: 'שלח', en: 'Submit' },
  update: { he: 'עדכן', en: 'Update' },
  add: { he: 'הוסף', en: 'Add' },
  delete: { he: 'מחק', en: 'Delete' },

  // Stats
  lotCount: { he: 'חניונים', en: 'lots' },
  occupied: { he: 'תפוס', en: 'occupied' },
  available: { he: 'פנוי', en: 'available' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('he');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  // Update document direction and language when language changes
  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
