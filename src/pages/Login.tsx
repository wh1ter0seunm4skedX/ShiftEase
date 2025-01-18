import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageTransition from '../components/PageTransition';
// Social icons (Google, Facebook, Twitter)
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      console.log('Login - User already logged in, redirecting to dashboard...');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      console.log('Login - Attempting login...');
      await login(email, password);
      console.log('Login - Login successful, redirecting to dashboard...');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login - Login error:', err);
      setError('Invalid credentials');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
        {/* 
          Curved top shape using clip-path (no inline SVG).
          Adjust 'polygon' points to shape the curve differently.
        */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 bg-red-500"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)',
          }}
        />

        {/* Main content container */}
        <div className="relative z-10 w-full max-w-sm px-6">
          {/* Title / Branding */}
          <div className="mb-8 text-center">
            <h1 className="text-white text-3xl font-bold tracking-wide mb-1">
              Login
            </h1>
            <p className="text-sm text-white opacity-90">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          {/* Form card overlapping the red/white boundary */}
          <div className="bg-white rounded-lg shadow-lg p-6 pt-8">
            {/* Error display */}
            {error && (
              <div className="mb-4 text-center text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 
                             placeholder-gray-400 text-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-red-400 
                             focus:border-transparent transition"
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2 
                             placeholder-gray-400 text-gray-700 
                             focus:outline-none focus:ring-2 focus:ring-red-400
                             focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              {/* Forgot Password + Login button row */}
              <div className="flex items-center justify-between mb-6">
                <a
                  href="/forgot-password"
                  className="text-sm text-gray-600 hover:text-red-400 transition"
                >
                  Forgot Password?
                </a>
                <button
                  type="submit"
                  className="bg-black text-white rounded-md py-2 px-6 
                             text-sm font-medium hover:bg-gray-800 transition
                             focus:outline-none focus:ring-2 focus:ring-black
                             focus:ring-offset-2"
                >
                  LOGIN
                </button>
              </div>
            </form>

            {/* OR divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="text-sm text-gray-500 px-2">or login with</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Social buttons */}
            <div className="flex justify-center space-x-4">
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-red-400 transition"
                aria-label="Login with Google"
              >
                <FaGoogle className="text-lg text-gray-600" />
              </button>
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-red-400 transition"
                aria-label="Login with Facebook"
              >
                <FaFacebookF className="text-lg text-gray-600" />
              </button>
              <button
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none 
                           focus:ring-2 focus:ring-red-400 transition"
                aria-label="Login with Twitter"
              >
                <FaTwitter className="text-lg text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
