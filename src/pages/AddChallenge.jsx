import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { FaSpinner } from 'react-icons/fa';

const CHALLENGE_CATEGORIES = [
  'Green Living',
  'Water Conservation',
  'Energy Conservation',
  'Sustainable Transport',
  'Waste Reduction',
  'Community',
];

const API_ENDPOINT = 'https://eco-track-server-ten.vercel.app/challenges';

const AddChallenge = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CHALLENGE_CATEGORIES[0],
    duration: 7,
    target: '',
    impactMetric: '',
    imageUrl: '',
    createdBy: 'demoUser@example.com',
    participants: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'duration' || name === 'participants' ? Number(value) : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          startDate: new Date().toISOString(),
          endDate: new Date(
            new Date().getTime() + formData.duration * 24 * 60 * 60 * 1000
          ).toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create challenge.');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Challenge Created!',
        text: 'Your challenge has been created successfully! 🎉',
        confirmButtonColor: '#28a745',
      });

      navigate('/challenges');
    } catch (err) {
      console.error('Submission Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.message || 'Error creating challenge.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-10 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Add New Challenge 💡
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Challenge Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="e.g., 7-Day No Single-Use Plastic"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150 bg-white appearance-none"
            >
              {CHALLENGE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              placeholder="Explain what the challenge involves and its goal..."
            ></textarea>
          </div>

          {/* Duration & Target */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Duration (Days) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
              />
            </div>

            <div>
              <label
                htmlFor="target"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Target / Goal (e.g., 10,000 steps/day)
              </label>
              <input
                type="text"
                id="target"
                name="target"
                value={formData.target}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                placeholder="Specific measurable goal"
              />
            </div>
          </div>

          {/* Impact Metric & Image */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="impactMetric"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Impact Metric (e.g., Waste (Kg), CO2 Saved)
              </label>
              <input
                type="text"
                id="impactMetric"
                name="impactMetric"
                value={formData.impactMetric}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                placeholder="How the impact will be measured"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                placeholder="Link to an image for the challenge"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 flex justify-between flex-wrap gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 shadow-green-500/50'
              }`}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Creating...
                </>
              ) : (
                'Submit Challenge'
              )}
            </button>

            <Link
              to="/challenges"
              className="px-6 py-3 rounded-xl font-semibold text-gray-600 border border-gray-300 hover:bg-gray-100 transition duration-300 flex items-center justify-center gap-2"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddChallenge;
