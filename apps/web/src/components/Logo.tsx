import { MapPin } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo = ({ size = 'md', showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md`}
      >
        <MapPin className="w-2/3 h-2/3 text-white fill-white" />
      </div>
      {showText && (
        <span
          className={`${textSizeClasses[size]} font-semibold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent`}
        >
          FindMyParking TLV
        </span>
      )}
    </div>
  );
};
