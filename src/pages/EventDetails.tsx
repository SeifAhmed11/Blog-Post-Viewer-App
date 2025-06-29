import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Tag, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import EventContext, { Event } from '../context/EventContext';
import AuthContext from '../context/AuthContext';

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEvent, createBooking, isEventBooked } = useContext(EventContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (id) {
          const eventData = await getEvent(id);
          setEvent(eventData);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, getEvent]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!event) return;

    try {
      setBookingLoading(true);
      await createBooking(event.id);
      navigate(`/confirmation/${event.id}`);
    } catch (err: any) {
      setError(err.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
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
  const isBooked = isEventBooked(event.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <img 
              src={event.image || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg'} 
              alt={event.title}
              className="w-full h-full object-cover object-center"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="lg:w-1/2 p-8">
            <div className="flex flex-col h-full">
              <div>
                <div className="flex items-center mb-4">
                  <Tag className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-sm font-medium text-indigo-600">{event.category}</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                <p className="text-gray-700 mb-8">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  
                  <div className="flex items-start">
                    <DollarSign className="h-6 w-6 text-indigo-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Price</p>
                      <p className="text-gray-600">${event.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-gray-200">
                {isBooked ? (
                  <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md flex items-center">
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">You've already booked this event</span>
                  </div>
                ) : (
                  <button
                    onClick={handleBooking}
                    disabled={bookingLoading}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                  >
                    {bookingLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Book Now'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;