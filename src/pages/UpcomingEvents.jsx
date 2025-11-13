import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load Events',
          text: 'Please check your server connection.',
        });
      });
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTimeUntilEvent = dateString => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffMs = eventDate - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

    if (diffMs > 0) {
      return `${diffDays}d ${diffHours}h ${diffMinutes}m left`;
    } else {
      return null; // event is due or past
    }
  };

  if (loading)
    return (
      <p className="text-center py-20 text-xl font-medium text-gray-500">
        Loading upcoming events...
      </p>
    );

  if (events.length === 0)
    return (
      <section className="bg-gray-100 py-20 px-6 lg:px-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Upcoming Events
        </h2>
        <p className="text-center text-xl text-gray-600">
          No upcoming events right now. Check back soon!
        </p>
      </section>
    );

  return (
    <section className="bg-gray-100 py-20 px-6 lg:px-20">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
        ✨ Upcoming Events
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.slice(0, 4).map(event => {
          // ✅ শুধু প্রথম ৪টা ইভেন্ট
          const formattedDate = formatDate(event.date);
          const timeUntil = getTimeUntilEvent(event.date);

          return (
            <div
              key={event._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 
                        hover:shadow-2xl hover:shadow-green-200 transition-all duration-500 
                        transform hover:scale-[1.03] flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 font-medium mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wider">
                    {event.location}
                  </span>
                </p>

                <p className="text-gray-600 text-base mb-4 flex-grow line-clamp-3">
                  {event.description}
                </p>

                <div className="space-y-2 mb-6 border-t border-b border-gray-100 py-3">
                  <div className="flex items-center text-sm text-gray-700 justify-between">
                    <span className="flex items-center">
                      📅 {formattedDate}
                    </span>
                    {timeUntil && (
                      <span className="text-green-600 font-semibold">
                        {timeUntil}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-auto text-center py-2">
                  {timeUntil ? (
                    <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium">
                      Upcoming
                    </span>
                  ) : (
                    <button
                      onClick={() => alert(`Joining ${event.title}`)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition duration-300"
                    >
                      Join Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* All Events Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => (window.location.href = '/events')}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-300"
        >
          All Events
        </button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
