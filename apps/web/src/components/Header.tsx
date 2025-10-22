import { Moon, Sun, Globe, Building2 } from 'lucide-react';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onOwnerDashboardClick: () => void;
}

export function Header({ onOwnerDashboardClick }: HeaderProps) {
  const { language, setLanguage, t, dir } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo size="md" />

          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {language === 'he' ? 'עברית' : 'English'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                dir={dir}
                className="dark:bg-gray-800 dark:border-gray-700"
              >
                <DropdownMenuItem
                  onSelect={() => setLanguage('he')}
                  className={
                    language === 'he' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }
                >
                  עברית {language === 'he' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLanguage('en')}
                  className={
                    language === 'en' ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }
                >
                  English {language === 'en' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>

            {/* Owner Dashboard */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOwnerDashboardClick}
              className="gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('ownerDashboard')}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
