import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

type FormType = 'login' | 'register';

interface OwnerLoginProps {
  setIsOwnerLoginShown: (shown: boolean) => void;
}

const OwnerLogin: React.FC<OwnerLoginProps> = ({ setIsOwnerLoginShown }) => {
  const [formType, setFormType] = useState<FormType>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add validation here, e.g., password match
    setIsOwnerLoginShown(false);
    navigate('/owner');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl w-full max-w-md sm:max-w-sm shadow-lg">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOwnerLoginShown(false)}
          className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {formType === 'login'
            ? 'Login as lot owner'
            : 'Register as lot owner'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="email"
              className="block mb-1 font-medium w-full max-w-xs text-center sm:text-left text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="password"
              className="block mb-1 font-medium w-full max-w-xs text-center sm:text-left text-gray-700 dark:text-gray-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Confirm Password for Register */}
          {formType === 'register' && (
            <div className="flex flex-col items-center">
              <label
                htmlFor="confirmPassword"
                className="block mb-1 font-medium w-full max-w-xs text-center sm:text-left text-gray-700 dark:text-gray-200"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors cursor-pointer"
          >
            {formType === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        {/* Toggle Form Type */}
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
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
