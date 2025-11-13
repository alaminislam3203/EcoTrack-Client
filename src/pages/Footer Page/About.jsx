import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate('/challenges'); // Navigate to Challenges page
  };

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            About EcoTrack
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            EcoTrack is your companion in making sustainable choices. We create
            a community of environmentally conscious individuals who take
            meaningful actions for a greener planet.
          </p>
        </div>

        {/* Our Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-4">
              <FaLeaf className="text-green-600 w-10 h-10" />
              <h2 className="text-2xl font-semibold text-green-700">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to encourage and empower individuals to reduce
              their environmental footprint through actionable challenges,
              practical tips, and community engagement. By tracking progress and
              sharing knowledge, we inspire real change.
            </p>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center space-x-4">
              <FaUsers className="text-green-600 w-10 h-10" />
              <h2 className="text-2xl font-semibold text-green-700">
                Community Driven
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              EcoTrack is more than a tool; it's a thriving community. Connect
              with like-minded individuals, share tips, celebrate achievements,
              and stay motivated to live sustainably.
            </p>
          </div>
        </div>

        {/* How We Work */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <FaChartLine className="w-12 h-12 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Join a Challenge
            </h3>
            <p className="text-gray-600 text-sm">
              Browse our active challenges and pick one that aligns with your
              sustainability goals.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <FaLightbulb className="w-12 h-12 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">
              Track Your Progress
            </h3>
            <p className="text-gray-600 text-sm">
              Log your activities and see your environmental impact grow over
              time.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-xl shadow-lg">
            <FaUsers className="w-12 h-12 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-900">Share Tips</h3>
            <p className="text-gray-600 text-sm">
              Contribute your own eco-friendly tips and learn from others in the
              community.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold text-green-700">
            Get Started Today
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Take your first step towards sustainability. Join a challenge, track
            your progress, and be part of a community that cares about the
            planet.
          </p>
          <button
            onClick={handleExplore}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Explore Challenges
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
