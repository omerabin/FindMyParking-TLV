import { Car } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LoadingSpinner = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 animate-spin"></div>
        <Car className="w-6 h-6 text-blue-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {t('loading')}
      </p>
    </div>
  );
};
