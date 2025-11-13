import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import userIcon from '../assets/user.png';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [previewURL, setPreviewURL] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  const handleUpdate = e => {
    e.preventDefault();
    setActionLoading(true);
    updateUser({ displayName: name, photoURL })
      .then(() => {
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      })
      .catch(err => {
        toast.error('Failed to update profile.');
        console.error(err);
      })
      .finally(() => setActionLoading(false));
  };

  if (!user || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-start bg-gray-100 py-10 px-4">
      <div className="card w-full max-w-md shadow-xl bg-white rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={previewURL || userIcon}
            alt="User"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-md mb-4"
            onError={e => {
              e.target.onerror = null;
              e.target.src = userIcon;
            }}
          />

          <div className="text-center mb-2">
            <p className="text-sm text-gray-500">Full Name:</p>
            <p className="text-lg font-semibold">
              {user?.displayName || 'No Name'}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">Email Address:</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="btn btn-primary w-full"
          >
            Update Profile
          </button>
        ) : (
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={e => {
                  setPhotoURL(e.target.value);
                  setPreviewURL(e.target.value);
                }}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              disabled={actionLoading}
              className={`btn btn-primary mt-2 flex items-center justify-center gap-2 ${
                actionLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {actionLoading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Updating...
                </>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
