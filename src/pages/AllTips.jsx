import React, { useEffect, useState } from 'react';

const API_ENDPOINT = 'http://localhost:3000/all-tips';

const AllTips = () => {
  const [allTips, setAllTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTips = async () => {
      try {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // 💡 এখানে সব ডেটা দেখানোর জন্য শুধু সর্টিং করা হবে, limit() ব্যবহার হবে না।
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setAllTips(sortedData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch all tips:', err);
        setError(
          'Failed to load all tips. Please check the server connection.'
        );
        setLoading(false);
      }
    };

    fetchAllTips();
  }, []);

  // Date Formatter
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // --- Loading, Error, Empty States ---
  if (loading) {
    return (
      <section className="min-h-screen py-20 px-6 bg-gray-900 text-white">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          All Tips 💡
        </h2>
        <p className="text-center text-xl text-gray-400">
          Fetching all tips...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-screen py-20 px-6 bg-gray-900 text-white">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center">
          All Tips 💡
        </h2>
        <p className="text-center text-xl text-red-400">{error}</p>
      </section>
    );
  }

  // --- Main UI for All Tips ---
  return (
    <section className="min-h-screen py-20 px-6 lg:px-20 bg-gray-900 text-white">
      <h1 className="text-5xl font-extrabold text-white mb-16 text-center tracking-tight border-b-2 border-green-600 pb-4 max-w-lg mx-auto">
        <span className="text-green-400">All</span> Tips
      </h1>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {allTips.map((tip, index) => (
          <div
            key={index}
            // 💎 Premium Card Styling for All Tips
            className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 
                                   hover:bg-gray-700 transition duration-500 transform hover:translate-y-[-4px]
                                   flex flex-col justify-between"
          >
            <div>
              {/* Category Tag */}
              <span className="inline-block px-3 py-1 mb-3 text-xs font-bold uppercase rounded-full bg-green-900/50 text-green-400">
                {tip.category}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                {tip.title}
              </h3>

              {/* Content/Excerpt */}
              <p className="text-gray-400 mb-4 text-sm line-clamp-3">
                {tip.content}
              </p>
            </div>

            {/* Footer / Meta Data Section */}
            <div className="pt-4 border-t border-gray-700 mt-4">
              <div className="flex justify-between items-end text-sm">
                {/* Left Side: Author & Upvotes */}
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase text-gray-500">
                    By
                  </p>
                  <span className="font-medium text-green-300 flex items-center">
                    {tip.authorName}
                  </span>

                  <span className="text-sm font-bold text-green-500 flex items-center">
                    👍 {tip.upvotes}
                  </span>
                </div>

                {/* Right Side: Date */}
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

      {allTips.length === 0 && (
        <p className="text-center text-xl text-gray-400 mt-10">
          No tips found yet.
        </p>
      )}
    </section>
  );
};

export default AllTips;
