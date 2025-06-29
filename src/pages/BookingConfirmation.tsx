import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import EventContext, { Event } from '../context/EventContext';

const BookingConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEvent } = useContext(EventContext);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const eventData = await getEvent(id);
          setEvent(eventData);
        }
      } catch (err) {
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, getEvent]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <p>Event not found</p>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'EEEE, MMMM dd, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Your ticket for <span className="font-semibold">{event.title}</span> has been booked successfully.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-6 w-6 text-indigo-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Date</p>
                  <p className="text-gray-600">{formattedDate}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-indigo-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Time</p>
                  <p className="text-gray-600">{formattedTime}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-indigo-600 mr-3 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Venue</p>
                  <p className="text-gray-600">{event.venue}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to your registered email address.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/"
                className="bg-indigo-600 text-white py-2 px-6 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;