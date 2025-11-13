import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { FaLeaf, FaSpinner } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const userId = user?.email;

  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);

  const [createdChallenges, setCreatedChallenges] = useState([]);
  const [createdLoading, setCreatedLoading] = useState(true);

  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchActivities = () => {
    setActivitiesLoading(true);
    fetch(`https://eco-track-server-ten.vercel.app/user-challenges/${userId}`)
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setActivitiesLoading(false);
      })
      .catch(() => setActivitiesLoading(false));
  };

  const fetchCreatedChallenges = () => {
    setCreatedLoading(true);
    fetch(`https://eco-track-server-ten.vercel.app/challenges`)
      .then(res => res.json())
      .then(data => {
        setCreatedChallenges(data);
        setCreatedLoading(false);
      })
      .catch(() => setCreatedLoading(false));
  };

  useEffect(() => {
    if (!userId) return;
    fetchActivities();
    fetchCreatedChallenges();
  }, [userId]);

  const handleDeleteActivity = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to leave this joined activity?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave it!',
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(id);
      const res = await fetch(
        `https://eco-track-server-ten.vercel.app/user-challenges/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (res.ok) {
        setActivities(prev => prev.filter(a => a._id !== id));
        Swal.fire(
          'Removed!',
          'Joined activity removed successfully.',
          'success'
        );
      } else {
        Swal.fire('Failed!', 'Failed to leave joined activity.', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      Swal.fire('Error!', 'An error occurred during leaving.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteCreatedChallenge = async c => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this challenge?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(c._id);
      const res = await fetch(
        `https://eco-track-server-ten.vercel.app/challenges/${c._id}`,
        {
          method: 'DELETE',
        }
      );
      if (res.ok) {
        setCreatedChallenges(prev => prev.filter(ch => ch._id !== c._id));
        fetchActivities();
        Swal.fire('Deleted!', 'Challenge deleted successfully.', 'success');
      } else {
        Swal.fire('Failed!', 'Failed to delete challenge.', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      Swal.fire('Error!', 'An error occurred during deletion.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  if (activitiesLoading || createdLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-green-300 border-t-green-600 animate-spin"></div>
          <FaLeaf className="absolute inset-4 m-auto text-green-500 w-16 h-16" />
        </div>
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Loading activities...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 lg:px-20">
      {/* Created Challenges */}
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center border-b-2 border-blue-200 pb-2">
        All Created Challenges
      </h1>

      {createdChallenges.length === 0 ? (
        <p className="text-center text-gray-500 mb-12">
          No challenges available.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {createdChallenges.map(c => (
            <div
              key={c._id}
              className="bg-white shadow-xl rounded-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition relative flex justify-between items-center p-4"
            >
              <div className="flex-1 pr-4 space-y-1">
                <h2 className="text-xl font-bold text-blue-800">
                  {c.title || 'No Title'}
                </h2>
                <p className="text-sm text-gray-600">
                  <b>Category:</b> {c.category}
                </p>
                <p className="text-sm text-gray-600">
                  <b>Duration:</b> {c.duration} days
                </p>
                <p className="text-sm text-gray-600">
                  <b>Metric:</b> {c.impactMetric}
                </p>
                <p className="text-sm text-gray-500">
                  <b>Created By:</b> {c.createdBy || 'Unknown'}
                </p>
              </div>

              {c.imageUrl && (
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}

              <button
                onClick={() => handleDeleteCreatedChallenge(c)}
                disabled={actionLoadingId === c._id}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded font-semibold shadow-md transition flex items-center gap-1"
              >
                {actionLoadingId === c._id ? (
                  <>
                    <FaSpinner className="animate-spin text-xs" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Joined Challenges */}
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center border-b-2 border-green-200 pb-2">
        Challenges I Joined
      </h1>

      {activities.length === 0 ? (
        <p className="text-center text-gray-500">No challenges joined yet.</p>
      ) : (
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
          {activities.map(a => (
            <div
              key={a._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-green-100 hover:shadow-xl transition flex justify-between items-center p-4 relative"
            >
              <div className="flex-1 pr-4 space-y-1">
                <h2 className="text-xl font-semibold text-green-700">
                  {a.challenge?.title || 'No Title'}
                </h2>
                <p className="text-sm text-gray-600">
                  <b>Category:</b> {a.challenge?.category || 'N/A'}
                </p>
                <p className="text-sm text-gray-600">
                  <b>Status:</b> Joined
                </p>
                <p className="text-sm text-gray-600">
                  <b>Progress:</b> {a.progress || 0}%
                </p>
                <p className="text-sm text-gray-500">
                  <b>Joined on:</b>{' '}
                  {a.joinDate
                    ? new Date(a.joinDate).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>

              {a.challenge?.imageUrl && (
                <img
                  src={a.challenge.imageUrl}
                  alt={a.challenge.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}

              <button
                onClick={() => handleDeleteActivity(a._id)}
                disabled={actionLoadingId === a._id}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded font-semibold shadow-md transition flex items-center gap-1"
              >
                {actionLoadingId === a._id ? (
                  <>
                    <FaSpinner className="animate-spin text-xs" />
                    Leaving...
                  </>
                ) : (
                  'Leave'
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyActivities;
