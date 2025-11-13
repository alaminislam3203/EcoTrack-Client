import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { AuthContext } from '../provider/AuthProvider';
import { FaLeaf } from 'react-icons/fa';

const ChallengeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joined, setJoined] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch challenge details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/challenges');
        const data = await res.json();
        const found = data.find(item => item._id === id);
        if (found) setChallenge(found);
        else setError('Challenge not found');
        setLoading(false);

        // Check if user already joined this challenge
        if (user?.email) {
          const userRes = await fetch(
            `http://localhost:3000/user-challenges/${user.email}`
          );
          const userChallenges = await userRes.json();
          const hasJoined = userChallenges.some(
            uc => uc.challengeId === id || uc.challenge?._id === id
          );
          setJoined(hasJoined);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch challenge');
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user]);

  const handleJoinChallenge = async () => {
    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login to join this challenge!',
        confirmButtonText: 'Go to Login',
      }).then(result => {
        if (result.isConfirmed) navigate('/auth/login');
      });
      return;
    }

    if (joined) {
      Swal.fire({
        icon: 'warning',
        title: 'Already Joined',
        text: 'You have already joined this challenge!',
      });
      return;
    }

    try {
      setActionLoading(true);

      // 1️⃣ Add to user-challenges
      await fetch('http://localhost:3000/user-challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.email,
          challengeId: challenge._id,
        }),
      });

      // 2️⃣ Increment participants in challenges collection
      await fetch(
        `http://localhost:3000/challenges/${challenge._id}/increment`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // 3️⃣ Update local state
      setChallenge(prev => ({ ...prev, participants: prev.participants + 1 }));
      setJoined(true);

      Swal.fire({
        icon: 'success',
        title: 'Joined!',
        text: 'Challenge added to your activities!',
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Failed to join challenge.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="animate-spin mb-4 text-green-600">
          <FaLeaf className="h-16 w-16" />
        </div>
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Loading challenge details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
        <Link
          to="/challenges"
          className="text-green-700 hover:underline font-semibold"
        >
          ← Back to Challenges
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden relative">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-white font-semibold shadow-md ${
              joined ? 'bg-green-600' : 'bg-gray-400'
            }`}
          >
            {joined ? 'Joined' : 'Not Joined'}
          </span>
        </div>

        {challenge.imageUrl && (
          <img
            src={challenge.imageUrl}
            alt={challenge.title}
            className="w-full h-80 object-cover"
          />
        )}

        <div className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-green-700">
            {challenge.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Category:</span>{' '}
              {challenge.category}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Created By:</span>{' '}
              {challenge.createdBy || 'Unknown'}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed text-base">
            {challenge.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 bg-green-50 p-6 rounded-xl">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Duration:</span>{' '}
                {challenge.duration ? `${challenge.duration} days` : 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Target:</span>{' '}
                {challenge.target || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">
                  Participants:
                </span>{' '}
                {challenge.participants || 0}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Impact:</span>{' '}
                {challenge.impactMetric || 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">Start Date:</span>{' '}
                {challenge.startDate
                  ? new Date(challenge.startDate).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">End Date:</span>{' '}
                {challenge.endDate
                  ? new Date(challenge.endDate).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className="pt-6 flex justify-between flex-wrap gap-4">
            <Link
              to="/challenges"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
            >
              ← Back to All Challenges
            </Link>

            <button
              onClick={handleJoinChallenge}
              disabled={joined || actionLoading}
              className={`inline-block px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${
                joined
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {actionLoading ? 'Joining...' : 'Join Challenge'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengeDetails;
