import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import SignUpForm from './SignUpForm';

interface SettingsProps {
  onClose: () => void;
}

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [IsSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>(() => {
    const savedData = localStorage.getItem('userFormData');
    return savedData ? JSON.parse(savedData) : {
      email: '',
      password: '',
      rememberMe: false
    };
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.rememberMe) {
      localStorage.setItem('userFormData', JSON.stringify(formData));
    } else {
      localStorage.removeItem('userFormData');
    }
    console.log('Sign in:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50">
      {IsSignUpFormOpen ? (
        <SignUpForm onClose={() => setIsSignUpFormOpen(false)} />
      ) : (
        <div
          ref={panelRef}
          className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out"
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-8 pt-10">
              <h2 className="text-2xl font-semibold text-gray-900">Sign In</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-transform duration-200 hover:scale-[1.02]"
              >
                Sign In
              </button>
              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUpFormOpen(true)}
                  className="text-purple-600 hover:text-purple-500 font-medium"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>

    {/* Settings Modal */}
    {IsSignUpFormOpen && (
      <div className="fixed inset-0 z-[999]">
        <SignUpForm onClose={() => setIsSignUpFormOpen(false)} />
      </div>
    )}
  </>);
};

export default Settings;
