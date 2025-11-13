import React, { useEffect, useState } from 'react';
import { useJoinedChallenges } from '../hooks/useJoinedChallenges';

const UserChallenges = ({ userId }) => {
  const [challenges, setChallenges] = useState([]);
  const [userChallenges, setUserChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const { joinedChallenges, toggleJoin, reloadJoined } = useJoinedChallenges();

  useEffect(() => {
    fetch('https://eco-track-server-ten.vercel.app/challenges')
      .then(res => res.json())
      .then(data => setChallenges(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`https://eco-track-server-ten.vercel.app/user-challenges/${userId}`)
      .then(res => res.json())
      .then(data => setUserChallenges(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  useEffect(() => {
    reloadJoined();
  }, [reloadJoined]);

  const handleJoin = async challengeId => {
    setJoining(true);
    try {
      const res = await fetch(
        'https://eco-track-server-ten.vercel.app/user-challenges',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, challengeId }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert('Challenge joined successfully!');
        setUserChallenges(prev => [...prev, data.data]);
        toggleJoin(challengeId, true);
      } else {
        alert(data.message || 'Failed to join challenge');
      }
    } catch (error) {
      console.error(error);
      alert('Error joining challenge');
    } finally {
      setJoining(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your challenges...</p>;

  return (
    <div className="px-6 py-12 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        🌿 Your Challenges
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map(challenge => {
          // 🔹 Safe ObjectId/string comparison
          const userCh = userChallenges.find(
            uc =>
              uc.challengeId &&
              uc.challengeId.toString() === challenge._id.toString()
          );
          const isJoined =
            !!userCh || joinedChallenges[challenge._id.toString()] === true;

          return (
            <div
              key={challenge._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {challenge.imageUrl && (
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {challenge.title}
                </h3>
                <p className="text-sm text-green-600 font-medium uppercase tracking-wide">
                  {challenge.category}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {challenge.description}
                </p>

                <div className="text-gray-600 text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Duration:</span>{' '}
                    {challenge.duration} days
                  </p>
                  <p>
                    <span className="font-semibold">Target:</span>{' '}
                    {challenge.target}
                  </p>
                  <p>
                    <span className="font-semibold">Created By:</span>{' '}
                    {challenge.createdBy}
                  </p>
                  <p>
                    <span className="font-semibold">Start:</span>{' '}
                    {new Date(challenge.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">End:</span>{' '}
                    {new Date(challenge.endDate).toLocaleDateString()}
                  </p>

                  {userCh && (
                    <>
                      <p>
                        <span className="font-semibold">Status:</span>{' '}
                        {userCh.status}
                      </p>
                      <p>
                        <span className="font-semibold">Progress:</span>{' '}
                        {userCh.progress}%
                      </p>
                      <p>
                        <span className="font-semibold">Joined On:</span>{' '}
                        {new Date(userCh.joinDate).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>

                {!isJoined && (
                  <button
                    onClick={() => handleJoin(challenge._id)}
                    disabled={joining}
                    className="mt-4 w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    {joining ? 'Joining...' : 'Join Challenge'}
                  </button>
                )}

                {isJoined && (
                  <p className="text-green-600 font-semibold mt-4 text-center">
                    Joined
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserChallenges;
