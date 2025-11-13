import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Skeleton Card Component
const SkeletonCard = () => (
  <div className="bg-white shadow-md rounded-2xl overflow-hidden border animate-pulse flex flex-col">
    <div className="bg-gray-200 h-48 w-full"></div>
    <div className="p-6 space-y-3 flex-grow">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    <div className="p-6">
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const ActiveChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/challenges')
      .then(res => res.json())
      .then(data => {
        // Sort by date (descending) and take 6 recent
        const sorted = data
          .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
          .slice(0, 6);
        setChallenges(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching challenges:', error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-gray-50 py-12 px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-10">
        Active Challenges
      </h2>

      {loading ? (
        // Skeleton Loader Grid
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : challenges.length === 0 ? (
        <p className="text-center text-gray-500">No active challenges found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map(challenge => (
            <div
              key={challenge._id}
              className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden border transition-transform transform hover:-translate-y-1 duration-300"
            >
              {/* Image */}
              {challenge.imageUrl && (
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Details */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-green-700">
                  {challenge.title}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Category:</span>{' '}
                  {challenge.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">
                    Impact Metric:
                  </span>{' '}
                  {challenge.impactMetric || 'N/A'}
                </p>

                {/* View Button */}
                <div className="pt-4">
                  <Link
                    to={`/challenges/${challenge._id}`}
                    className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all duration-300"
                  >
                    View Challenge
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Challenges Button */}
      <div className="flex justify-center mt-12">
        <Link
          to="/challenges"
          className="inline-block bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
        >
          View All Challenges
        </Link>
      </div>
    </section>
  );
};

export default ActiveChallenges;
