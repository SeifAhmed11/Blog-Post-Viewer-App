import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { Event } from '../context/EventContext';
import EventContext from '../context/EventContext';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isEventBooked } = useContext(EventContext);
  const isBooked = isEventBooked(event.id);
  
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, 'MMM dd, yyyy');
  const formattedTime = format(eventDate, 'h:mm a');

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={event.image || 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg'} 
          alt={event.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 m-2 px-2 py-1 bg-white bg-opacity-80 rounded text-sm font-medium text-gray-900">
          <div className="flex items-center">
            <Tag size={14} className="mr-1 text-indigo-600" />
            <span>{event.category}</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{event.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 text-indigo-600" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-2 text-indigo-600" />
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 text-indigo-600" />
            <span>{event.venue}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-indigo-600 font-semibold">
            ${event.price.toFixed(2)}
          </span>
          {isBooked ? (
            <div className="px-4 py-2 bg-green-100 text-green-800 font-medium rounded-md flex items-center">
              <span>Booked</span>
            </div>
          ) : (
            <Link 
              to={`/events/${event.id}`}
              className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            >
              Book Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;