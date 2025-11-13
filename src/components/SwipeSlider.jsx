import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

const SwipeSlider = () => {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/challenges')
      .then(res => res.json())
      .then(data => {
        const firstThree = data.slice(0, 3);
        setSlides(firstThree);
        setLoading(false); // Stop loader when data is ready
      })
      .catch(err => {
        console.error('Failed to load slider data:', err);
        setLoading(false);
      });
  }, []);

  const handleViewChallenge = id => {
    navigate(`/challenges/${id}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="animate-spin mb-4 text-green-600">
          <FaLeaf className="h-16 w-16" />
        </div>
        <p className="text-gray-700 text-lg font-semibold animate-pulse">
          Loading Homepage...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[90vh] sm:h-[95vh] lg:h-screen overflow-hidden rounded-none">
      {slides.length > 0 ? (
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
          className="h-full"
        >
          {slides.map((challenge, index) => (
            <SwiperSlide key={challenge._id} className="relative h-full">
              {/* Background Image */}
              <img
                src={challenge.imageUrl}
                alt={challenge.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10">
                {activeIndex === index && (
                  <>
                    <motion.h1
                      key={`title-${index}`}
                      initial={{ opacity: 0, y: -60 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9 }}
                      className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
                    >
                      {challenge.title}
                    </motion.h1>

                    <motion.p
                      key={`desc-${index}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.9, delay: 0.3 }}
                      className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mb-12"
                    >
                      {challenge.description}
                    </motion.p>

                    <motion.button
                      onClick={() => handleViewChallenge(challenge._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition mt-16"
                    >
                      View Challenge
                    </motion.button>
                  </>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center items-center h-full text-gray-500">
          No Challenges Found.
        </div>
      )}

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #16a34a !important; /* Tailwind green-600 */
        }
      `}</style>
    </div>
  );
};

export default SwipeSlider;
