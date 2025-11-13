import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields!');
      return;
    }

    // Here you can send data to your backend or email service
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully!');

    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            Contact Us
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            Have questions, suggestions, or want to collaborate? Reach out to us
            and we'll get back to you promptly.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-2 bg-white p-6 rounded-xl shadow-lg">
            <FaEnvelope className="w-10 h-10 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">support@ecotrack.com</p>
          </div>

          <div className="flex flex-col items-center space-y-2 bg-white p-6 rounded-xl shadow-lg">
            <FaPhone className="w-10 h-10 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
            <p className="text-gray-600">+880 1234 567890</p>
          </div>

          <div className="flex flex-col items-center space-y-2 bg-white p-6 rounded-xl shadow-lg">
            <FaMapMarkerAlt className="w-10 h-10 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            <p className="text-gray-600">Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
