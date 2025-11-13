import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaLeaf, FaSpinner } from 'react-icons/fa';

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  // Password validation
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

  const handleRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photo = form.photo.value.trim();
    const password = form.password.value;

    if (name.length < 5) {
      toast.error('Name should be more than 5 characters');
      return;
    }

    const passError = validatePassword(password);
    setPasswordError(passError);
    if (passError) return;

    setLoading(true);
    createUser(email, password)
      .then(result => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success('Account created successfully!');
            setTimeout(() => navigate('/'), 1500);
          })
          .catch(() => setUser(user));
      })
      .catch(err => toast.error(`❌ ${err.message}`))
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
          Creating account...
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Join EcoTrack
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Name</label>
            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            />
          </div>

          {/* Photo URL */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Photo URL</label>
            <input
              name="photo"
              type="text"
              placeholder="Enter photo URL"
              required
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
                placeholder="Enter password"
                required
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition ${
                  passwordError ? 'border-red-500' : ''
                } pr-12`}
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

          {/* Register Button with loading state */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition duration-300 shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Creating account...
              </>
            ) : (
              'Register'
            )}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 pt-4">
            Already have an account?{' '}
            <Link
              to="/auth/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
