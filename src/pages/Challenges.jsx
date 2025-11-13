import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

// Skeleton Loader Component
const SkeletonCard = () => (
  <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 animate-pulse flex flex-col">
    <div className="bg-gray-200 h-48 w-full"></div>
    <div className="p-5 space-y-3 flex-grow">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="space-y-1 mt-2">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
    <div className="p-5">
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  </div>
);

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [participantsFilter, setParticipantsFilter] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch challenges from backend
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/challenges')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch challenges');
        return res.json();
      })
      .then(data => {
        // Use MongoDB participants field directly
        const mappedData = data.map(ch => ({
          ...ch,
          participantsCount: ch.participants || 0,
        }));
        setChallenges(mappedData);
        setFilteredChallenges(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching challenges:', err);
        setError('Failed to load challenges');
        setLoading(false);
      });
  }, []);

  // Handle search and filters
  const handleSearch = () => {
    setSearchLoading(true);
    setTimeout(() => {
      let filtered = challenges;

      if (searchTerm) {
        filtered = filtered.filter(ch =>
          ch.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (categoryFilter) {
        filtered = filtered.filter(ch => ch.category === categoryFilter);
      }

      if (startDateFilter) {
        filtered = filtered.filter(
          ch =>
            ch.startDate && new Date(ch.startDate) >= new Date(startDateFilter)
        );
      }

      if (participantsFilter) {
        filtered = filtered.filter(
          ch => ch.participantsCount >= parseInt(participantsFilter)
        );
      }

      setFilteredChallenges(filtered);
      setSearchLoading(false);
    }, 300);
  };

  const handleAddChallenge = () => {
    setActionLoadingId('add');
    setTimeout(() => {
      navigate('/challenges/add');
      setActionLoadingId(null);
    }, 300);
  };

  const handleViewDetails = id => {
    setActionLoadingId(id);
    setTimeout(() => {
      navigate(`/challenges/${id}`);
      setActionLoadingId(null);
    }, 300);
  };

  const allCategories = [
    ...new Set(challenges.map(ch => ch.category).filter(Boolean)),
  ];

  return (
    <section className="bg-gray-50 min-h-screen py-12 px-6 lg:px-20">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-2 flex-wrap w-full lg:w-auto items-center">
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full lg:w-64 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full lg:w-48 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="w-full lg:w-36 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={startDateFilter}
            onChange={e => setStartDateFilter(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="Min participants"
            className="w-full lg:w-36 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            value={participantsFilter}
            onChange={e => setParticipantsFilter(e.target.value)}
          />
          <button
            onClick={handleSearch}
            disabled={searchLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            {searchLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </div>

        <button
          onClick={handleAddChallenge}
          disabled={actionLoadingId === 'add'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          {actionLoadingId === 'add' ? (
            <>
              <FaSpinner className="animate-spin" />
              Loading...
            </>
          ) : (
            'Add Challenge'
          )}
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
        🌿 Eco Challenges
      </h2>

      {loading ? (
        // Skeleton Loader grid
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredChallenges.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No challenges available right now.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredChallenges.map(challenge => (
            <div
              key={challenge._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col justify-between"
            >
              {challenge.imageUrl && (
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5 space-y-3 flex-grow">
                <h3 className="text-xl font-bold text-gray-900">
                  {challenge.title}
                </h3>
                <p className="text-sm text-green-600 font-medium uppercase tracking-wide">
                  {challenge.category}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {challenge.description?.slice(0, 120)}...
                </p>
                <div className="text-gray-600 text-sm space-y-1 mb-3">
                  <p>
                    <span className="font-semibold">Created By:</span>{' '}
                    {challenge.createdBy || 'Unknown'}
                  </p>
                  <p className="font-medium text-gray-700">
                    <span className="font-semibold">Participants:</span>{' '}
                    {challenge.participantsCount}
                  </p>
                  <div className=" flex item-center justify-between">
                    <p className="font-medium text-gray-700">
                      <span className="font-semibold">Start:</span>{' '}
                      {challenge.startDate
                        ? new Date(challenge.startDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    <p className="font-medium text-gray-700">
                      <span className="font-semibold">End:</span>{' '}
                      {challenge.endDate
                        ? new Date(challenge.endDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <button
                  onClick={() => handleViewDetails(challenge._id)}
                  disabled={actionLoadingId === challenge._id}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
                >
                  {actionLoadingId === challenge._id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'View Challenge'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
export default Challenges;
