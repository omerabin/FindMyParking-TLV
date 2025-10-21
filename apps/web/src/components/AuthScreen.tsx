import { FormEvent, useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface AuthScreenProps {
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export const AuthScreen = ({
  onClose,
  defaultTab = 'login',
}: AuthScreenProps) => {
  const { t, dir } = useLanguage();
  const { login, signup } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    type: 'finder' as 'finder' | 'owner',
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(loginData.email, loginData.password);
    onClose();
  };

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    signup(
      signupData.name,
      signupData.email,
      signupData.password,
      signupData.phone,
      signupData.type
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-md bg-white dark:bg-gray-900 relative"
        dir={dir}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} z-10`}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            FindMyParking TLV
          </h2>

          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">{t('email')}</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                    dir={dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">{t('password')}</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      dir={dir}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-1' : 'right-1'}`}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {t('login')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('userType')}</Label>
                  <RadioGroup
                    value={signupData.type}
                    onValueChange={(value) =>
                      setSignupData({
                        ...signupData,
                        type: value as 'finder' | 'owner',
                      })
                    }
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="finder" id="finder" />
                      <Label htmlFor="finder" className="cursor-pointer">
                        {t('parkingFinder')}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="owner" id="owner" />
                      <Label htmlFor="owner" className="cursor-pointer">
                        {t('lotOwner')}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t('name')}</Label>
                  <Input
                    id="signup-name"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                    dir={dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t('email')}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                    dir={dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone">{t('phone')}</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    value={signupData.phone}
                    onChange={(e) =>
                      setSignupData({ ...signupData, phone: e.target.value })
                    }
                    required
                    dir={dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('password')}</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                    dir={dir}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">{t('confirmPassword')}</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    dir={dir}
                  />
                </div>

                <Button type="submit" className="w-full">
                  {t('signup')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};
