import React from 'react';
import { TrendingUp, Award, Users } from 'lucide-react';

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-green-600" />,
    title: 'Reduce Your Impact',
    description:
      'Lower your carbon footprint and contribute to a healthier planet for future generations.',
  },
  {
    icon: <Award className="h-8 w-8 text-green-600" />,
    title: 'Save Money',
    description:
      'Sustainable choices often lead to reduced utility bills and long-term cost savings.',
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: 'Join a Community',
    description:
      'Connect with like-minded individuals and share tips for sustainable living.',
  },
];

export const WhyGoGreen = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Go Green?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
