import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchBarV2Props {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export const SearchBarV2 = ({ value, onChange, onClear }: SearchBarV2Props) => {
  const { t, dir } = useLanguage();

  return (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className={`${dir === 'rtl' ? 'pr-10 pl-10' : 'pl-10 pr-10'} dark:bg-gray-800 dark:text-white dark:border-gray-700`}
        dir={dir}
      />
      <Search
        className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400`}
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className={`absolute ${dir === 'rtl' ? 'left-1' : 'right-1'} top-1/2 -translate-y-1/2 h-7 w-7 p-0`}
        >
          <X className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
