import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

type FormType = 'login' | 'register';

export const OwnerLogin: React.FC = () => {
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
    navigate('/owner');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 "
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {formType === 'login' ? 'Login' : 'Register'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block mb-1 font-medium"
              style={{ direction: 'ltr' }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block mb-1 font-medium"
              style={{ direction: 'ltr' }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {formType === 'register' && (
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {formType === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {formType === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            onClick={() =>
              setFormType(formType === 'login' ? 'register' : 'login')
            }
            className="text-blue-600 hover:underline"
          >
            {formType === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;
