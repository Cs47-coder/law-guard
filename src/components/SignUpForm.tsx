import React, { useState, FormEvent } from 'react';
import { CheckCircle, X, Eye, EyeOff } from 'lucide-react';

interface SignUpFormProps {
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);

  // States to handle the visibility of password and confirmPassword
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log('Form submitted:', formData);

    setIsSuccess(true); // Show success animation

    // Reset form and close after 2.5 seconds
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-bold">
      {isSuccess ? (
        <div className="flex flex-col items-center space-y-4 animate-fade-in">
          <CheckCircle className="w-20 h-20 text-green-500 animate-pop" />
          <p className="text-xl font-semibold text-green-600">Sign up successful!</p>
        </div>
      ) : (
        <div className="max-w-md w-full space-y-8 transition-opacity duration-500">
          <button onClick={onClose} className="p-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700  rounded-full transition-colors float-right">
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please fill in the details to sign up
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <input
              name="firstName"
              type="text"
              required
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              name="lastName"
              type="text"
              required
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            {/* Password Input Field */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password Input Field */}
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
