import React, { useEffect, useState } from 'react';
import { FaLeaf, FaUsers, FaRecycle, FaCloud } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';

const LiveStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Fetch base stats
      const res = await fetch('http://localhost:3000/stats');
      if (!res.ok) throw new Error('Failed to load statistics');
      const data = await res.json();

      // Fetch challenges collection
      const challengesRes = await fetch('http://localhost:3000/challenges');
      if (!challengesRes.ok) throw new Error('Failed to fetch challenges');
      const challengesData = await challengesRes.json();

      // Calculate total plastic saved and total CO2 saved
      let totalPlasticSaved = 0;
      let totalCO2Saved = 0;

      challengesData.forEach(ch => {
        const metric = ch.impactMetric || '';

        // Plastic saved
        const plasticMatch = metric.match(/(\d+)\s*kg plastic saved\s*/i);
        if (plasticMatch) totalPlasticSaved += parseInt(plasticMatch[1], 10);

        // CO2 saved
        const co2Match = metric.match(/(\d+)\s*kg CO₂ saved\s*/i);
        if (co2Match) totalCO2Saved += parseInt(co2Match[1], 10);
      });

      setStats({
        ...data,
        totalPlasticSaved,
        totalCO2Saved,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to load statistics',
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <FaSpinner className="animate-spin text-4xl text-green-500 mb-4" />
        <p className="text-gray-700 font-semibold">Loading statistics...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-10 text-red-600 font-semibold">
        Failed to load statistics.
      </div>
    );
  }

  return (
    <section className="bg-green-50 py-10 px-6 lg:px-20">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8">
        Live Statistics
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {/* Total Challenges */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FaLeaf className="text-green-600 text-5xl mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Total Challenges
          </p>
          <p className="text-3xl font-bold text-green-700 mt-2">
            {stats.totalChallenges}
          </p>
        </div>

        {/* Total Participants */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FaUsers className="text-blue-600 text-5xl mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Total Participants
          </p>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {stats.totalEventParticipants}
          </p>
        </div>

        {/* Total Plastic Saved */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FaRecycle className="text-orange-600 text-5xl mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Total Plastic Saved (kg)
          </p>
          <p className="text-3xl font-bold text-orange-700 mt-2">
            {stats.totalPlasticSaved}
          </p>
        </div>

        {/* Total CO₂ Saved */}
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <FaCloud className="text-gray-600 text-5xl mb-4" />
          <p className="text-gray-700 font-semibold text-lg">
            Total CO₂ Saved (kg)
          </p>
          <p className="text-3xl font-bold text-gray-700 mt-2">
            {stats.totalCO2Saved}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
