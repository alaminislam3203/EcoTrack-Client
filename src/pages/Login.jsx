import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
import { FaEye, FaEyeSlash, FaLeaf, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || '/';

  const validatePassword = password => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password))
      return 'Password must contain at least 1 uppercase letter';
    if (!/[a-z]/.test(password))
      return 'Password must contain at least 1 lowercase letter';
    if (!/[!@#$%^&*]/.test(password))
      return 'Password must contain at least 1 special character';
    return '';
  };

  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const error = validatePassword(password);
    setPasswordError(error);
    if (error) return;

    setLoading(true);
    signIn(email, password)
      .then(() => {
        toast.success('Login successful!');
        navigate(from);
      })
      .catch(err => {
        toast.error(`❌ ${err.code || 'Login failed. Please try again.'}`);
      })
      .finally(() => setLoading(false));
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    googleSignIn()
      .then(() => {
        toast.success('Logged in with Google!');
        navigate(from);
      })
      .catch(err => {
        toast.error(`❌ ${err.code || 'Google login failed. Try again.'}`);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    // Global stylish loader
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-green-300 border-t-green-600 animate-spin"></div>
          <FaLeaf className="absolute inset-4 m-auto text-green-500 w-16 h-16" />
        </div>
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Logging in...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login to EcoTrack
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition pr-12 ${
                  passwordError ? 'border-red-500' : ''
                }`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordError && (
              <span className="text-red-500 text-sm mt-1">{passwordError}</span>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/auth/forgot-password"
              state={{ email: emailInput }}
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button with loading state */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition duration-300 shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 font-medium">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700 shadow-sm"
          >
            <FcGoogle size={24} />
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Signing in...
              </>
            ) : (
              'Login with Google'
            )}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 pt-4">
            Don't have an account?{' '}
            <Link
              to="/auth/register"
              className="text-green-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
