import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

type FormType = 'login' | 'register';
interface OwnerLoginProps {
  setIsOwnerLoginShown: (shown: boolean) => void;
}

export const OwnerLogin: React.FC<OwnerLoginProps> = ({
  setIsOwnerLoginShown,
}) => {
  const [formType, setFormType] = useState<FormType>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if (formType === 'register' && password !== confirmPassword) {
    //   alert('Passwords do not match!');
    //   return;
    // }

    // Reset fields
    // setEmail('');
    // setPassword('');
    // setConfirmPassword('');
    setIsOwnerLoginShown(false);
    navigate('/owner');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOwnerLoginShown(false)}
        className="absolute top-4 right-4"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md sm:max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">
          {formType === 'login'
            ? 'Login as lot owner'
            : 'Register as lot owner'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            <label
              htmlFor="email"
              className="block mb-1 font-medium w-full max-w-xs text-center sm:text-left"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="password"
              className="block mb-1 font-medium w-full max-w-xs text-center sm:text-left"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formType === 'register' && (
            <div className="flex flex-col items-center">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium w-full max-w-xs text-center sm:text-left"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full max-w-xs bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {formType === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
          {formType === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            onClick={() =>
              setFormType(formType === 'login' ? 'register' : 'login')
            }
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {formType === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;
