import React from 'react';

const steps = [
  {
    number: 1,
    title: 'Join a Challenge',
    description:
      'Browse our active challenges and pick one that aligns with your sustainability goals.',
  },
  {
    number: 2,
    title: 'Track Your Progress',
    description:
      'Log your activities and watch your environmental impact grow over time.',
  },
  {
    number: 3,
    title: 'Share Tips',
    description:
      'Contribute your own eco-friendly tips and learn from others in the community.',
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(step => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              {/* Step Number */}
              <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {step.number}
              </div>
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              {/* Description */}
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
