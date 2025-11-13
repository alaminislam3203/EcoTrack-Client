import React, { useEffect, useState } from 'react';

const API_ENDPOINT = 'http://localhost:3000/all-tips';

// Skeleton Card Component
const SkeletonTipCard = () => (
  <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 animate-pulse flex flex-col justify-between">
    <div>
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="pt-4 border-t border-gray-700 mt-4 flex justify-between">
      <div className="space-y-2">
        <div className="h-3 bg-gray-700 rounded w-14"></div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="space-y-2 text-right">
        <div className="h-3 bg-gray-700 rounded w-16"></div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
      </div>
    </div>
  </div>
);

const RecentTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentTips = async () => {
      try {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const sortedData = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setTips(sortedData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch tips:', err);
        setError(
          'Failed to load recent tips. Please check the server connection.'
        );
        setLoading(false);
      }
    };

    fetchRecentTips();
  }, []);

  const handleExploreMore = () => {
    window.location.href = '/all-tips';
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-900 text-white">
      <h2 className="text-4xl font-extrabold text-white mb-10 text-center tracking-tight">
        Recent Tips
      </h2>

      {loading ? (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTipCard key={i} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-400">{error}</p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 
                                   hover:bg-gray-700 transition duration-500 transform hover:scale-[1.02]
                                   flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-2 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                    {tip.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-700 mt-4">
                  <div className="flex justify-between items-end text-sm">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Author
                      </p>
                      <span className="font-medium text-white flex items-center">
                        👤 {tip.authorName}
                      </span>

                      <span className="text-sm font-bold text-green-500 flex items-center">
                        Upvotes : {tip.upvotes}
                      </span>
                    </div>

                    <div className="text-right space-y-1">
                      <p className="text-xs font-semibold uppercase text-gray-500">
                        Published
                      </p>
                      <span className="text-sm text-gray-300">
                        📅 {formatDate(tip.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {tips.length > 0 && (
            <div className="text-center mt-12">
              <button
                onClick={handleExploreMore}
                className="px-8 py-3 bg-green-600 text-white font-bold rounded-full shadow-lg shadow-green-600/50 hover:bg-green-500 transition duration-300 transform hover:scale-105"
              >
                Explore More Tips
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default RecentTips;
