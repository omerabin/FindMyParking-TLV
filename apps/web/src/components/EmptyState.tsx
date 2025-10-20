import { Search, Wifi, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface EmptyStateProps {
  type: 'no-results' | 'offline' | 'error';
  onRetry?: () => void;
}

export function EmptyState({ type, onRetry }: EmptyStateProps) {
  const { t } = useLanguage();

  const configs = {
    'no-results': {
      icon: Search,
      title: t('noResults'),
      description:
        type === 'no-results'
          ? 'נסה לשנות את קריטריוני החיפוש או הסינון'
          : 'Try changing your search or filter criteria',
    },
    offline: {
      icon: Wifi,
      title: t('offline'),
      description:
        type === 'offline'
          ? 'אנא בדוק את החיבור שלך לאינטרנט'
          : 'Please check your internet connection',
    },
    error: {
      icon: AlertCircle,
      title: type === 'error' ? 'משהו השתבש' : 'Something went wrong',
      description:
        type === 'error' ? 'אנא נסה שוב מאוחר יותר' : 'Please try again later',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
        {config.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm">
        {config.description}
      </p>
      {onRetry && <Button onClick={onRetry}>{t('tryAgain')}</Button>}
    </div>
  );
}
