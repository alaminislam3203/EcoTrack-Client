import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { WhyGoGreen } from '../components/WhyGoGreen';
import { HowItWorks } from '../components/HowItWorks';
import ActiveChallenges from '../pages/ActiveChallenges';
import UpcomingEvents from '../pages/UpcomingEvents';
import RecentTips from '../pages/RecentTips';
import { FaLeaf } from 'react-icons/fa';
import LiveStats from '../components/LiveStats';

const HomeLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [loading, setLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // 1.2s loader
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        {/* Stylish Spinner */}
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-green-300 border-t-green-600 animate-spin"></div>
          <FaLeaf className="absolute inset-4 m-auto text-green-500 w-16 h-16" />
        </div>
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          EcoTrack is loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full">
        <Outlet />

        {isHome && (
          <>
            {/* Live Statistics */}
            <section className="w-full">
              <LiveStats />
            </section>
            {/* ActiveChallenges */}
            <section className="w-full">
              <ActiveChallenges />
            </section>
            {/* RecentTips */}
            <section className="w-full">
              <RecentTips />
            </section>
            {/* UpcomingEvents */}
            <section className="w-full">
              <UpcomingEvents />
            </section>
            {/* WhyGoGreen */}
            <section className="w-full">
              <WhyGoGreen />
            </section>
            {/* HowItWorks */}
            <section className="w-full">
              <HowItWorks />
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full">
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
