import React from 'react';
import {
  FaUniversalAccess,
  FaLeaf,
  FaUsers,
  FaHandsHelping,
  FaInfoCircle,
} from 'react-icons/fa';

const AccessibilityNote = () => {
  const features = [
    {
      icon: <FaLeaf className="text-green-600 w-6 h-6 mr-3" />,
      title: 'Eco-Friendly Actions',
      description:
        'All activities and challenges are designed to promote sustainable living and reduce environmental impact.',
    },
    {
      icon: <FaUsers className="text-green-600 w-6 h-6 mr-3" />,
      title: 'Community Engagement',
      description:
        'Connect with like-minded individuals and share your eco-friendly journey with the community.',
    },
    {
      icon: <FaHandsHelping className="text-green-600 w-6 h-6 mr-3" />,
      title: 'Meaningful Impact',
      description:
        'Track your actions and see the tangible positive impact you’re making for a greener planet.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <div className="flex items-center mb-6">
          <FaUniversalAccess className="text-green-600 w-12 h-12 mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Accessibility Note
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 text-lg">
          EcoTrack is your companion in making sustainable choices. We create a
          community of environmentally conscious individuals who take meaningful
          actions for a greener planet. Our platform is designed to be fully
          accessible to ensure everyone can participate in eco-friendly
          activities with ease.
        </p>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {feature.icon}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Note */}
        <div className="mt-8 flex items-center bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
          <FaInfoCircle className="w-5 h-5 text-green-600 mr-3" />
          <p className="text-green-700">
            Tip: You can enable high contrast mode or use keyboard navigation to
            explore EcoTrack seamlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityNote;
