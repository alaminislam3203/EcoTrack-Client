import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/events')
      .then(res => res.json())
      .then(data => {
        // 🟢 Skip first 4 events
        const remainingEvents = data.slice(4);
        setTimeout(() => {
          setEvents(remainingEvents);
          setLoading(false);
        }, 1000); // ছোট delay added for smoother UX
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

  // 🌀 Global Spinner
  if (loading && events.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );

  // 🧱 Skeleton Cards while fetching data
  if (loading)
    return (
      <section className="bg-gray-100 py-20 px-6 lg:px-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          All Events
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
              <div className="flex justify-between items-center border-t pt-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
              </div>
              <div className="mt-6 h-10 bg-gray-200 rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      </section>
    );

  if (events.length === 0)
    return (
      <section className="bg-gray-100 py-20 px-6 lg:px-20">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          All Events
        </h2>
        <p className="text-center text-xl text-gray-600">
          No events available right now. Check back later!
        </p>
      </section>
    );

  // ✅ Main Events Section
  return (
    <section className="bg-gray-100 py-20 px-6 lg:px-20">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
        All Events
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map(event => {
          const formattedDate = new Date(event.date).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          );

          return (
            <div
              key={event._id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 
                        hover:shadow-2xl hover:shadow-green-200 transition-all duration-500 
                        transform hover:scale-[1.03] flex flex-col"
            >
              <div className="p-6 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-snug">
                  {event.title}
                </h3>

                {/* Location */}
                <p className="text-sm text-gray-500 font-medium mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold tracking-wider">
                    {event.location}
                  </span>
                </p>

                {/* Description */}
                <p className="text-gray-600 text-base mb-4 flex-grow line-clamp-3">
                  {event.description}
                </p>

                {/* Date + Participants */}
                <div className="space-y-2 mb-6 border-t border-b border-gray-100 py-3">
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center">
                      <span className="mr-2">📅</span>
                      <span className="font-semibold">{formattedDate}</span>
                    </div>
                    <div className="flex items-center text-green-600 font-semibold">
                      👥 {event.currentParticipants || 0}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-auto text-center py-2">
                  <span className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md">
                    Event End
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllEvents;
