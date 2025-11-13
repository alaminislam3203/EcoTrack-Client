import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState = location.state?.email || '';
  const [email, setEmail] = useState(emailFromState);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async e => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);

      setMessage(
        'A password reset link has been sent to your email. Please check your inbox or spam folder.'
      );

      setTimeout(() => {
        window.location.href = `https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox`;
      }, 1000);
    } catch (err) {
      console.error('Password reset error:', err);

      if (err.code === 'auth/user-not-found') {
        setError('No users were found with this email.');
      } else {
        setError(
          'There was a problem resetting your password. Please try again.'
        );
      }
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50 px-4">
      <div className="card bg-white w-full max-w-sm shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

        {message && (
          <div
            className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
            role="alert"
          >
            {message}
          </div>
        )}
        {error && (
          <div
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
            disabled={message}
          >
            Reset Password
          </button>

          {/*  Back to Login Button */}
          <button
            type="button"
            onClick={() => navigate('/auth/login')}
            className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 w-full mt-2"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
