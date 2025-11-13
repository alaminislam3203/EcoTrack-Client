import React from 'react';
import {
  FaCheckCircle,
  FaShieldAlt,
  FaUserLock,
  FaEnvelope,
} from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <section className="bg-gray-50 min-h-screen py-20 px-6 lg:px-32">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold text-green-700">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Your privacy is important to us. Learn how EcoTrack protects your
            information.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaUserLock className="text-green-600" /> Information We Collect
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Personal information you provide, such as name, email, and profile
              details.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Usage data: interactions with challenges, activities, and
              features.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Cookies and tracking technologies to enhance your experience.
            </li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaShieldAlt className="text-green-600" /> How We Use Your
            Information
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              To provide and maintain services including challenge tracking and
              progress.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Communicate with you about your account, challenges, and updates.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Personalize your experience and improve website features.
            </li>
            <li className="flex items-start gap-3">
              <FaCheckCircle className="text-green-600 mt-1" />
              Analyze trends and gather feedback for better services.
            </li>
          </ul>
        </div>

        {/* Data Sharing and Security */}
        <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaUserLock className="text-green-600" /> Data Sharing & Security
          </h2>
          <p className="text-gray-700">
            We respect your privacy and never sell or rent your personal
            information. Data may be shared only with trusted partners for
            providing requested services. All data is encrypted and stored
            securely with industry-standard measures.
          </p>
        </div>

        {/* Your Rights */}
        <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaUserLock className="text-green-600" /> Your Rights
          </h2>
          <p className="text-gray-700">
            You have the right to access, update, or delete your personal
            information at any time. Contact us directly to exercise your
            rights.
          </p>
        </div>

        {/* Policy Updates */}
        <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6 border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FaShieldAlt className="text-green-600" /> Changes to This Policy
          </h2>
          <p className="text-gray-700">
            EcoTrack may update this Privacy Policy occasionally. Any changes
            will be posted here with an updated effective date.
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-white shadow-xl rounded-3xl p-10 space-y-6 text-center border-l-4 border-green-600">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <FaEnvelope className="text-green-600" /> Contact Us
          </h2>
          <p className="text-gray-700">
            Questions or concerns about this policy? Reach out at{' '}
            <span className="font-semibold text-green-700">
              support@ecotrack.com
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
