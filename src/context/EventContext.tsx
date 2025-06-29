import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import AuthContext from './AuthContext';

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  venue: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: number;
  eventId: number;
  userId: number;
  event?: Event;
  createdAt: string;
}

interface EventContextType {
  events: Event[];
  userBookings: Booking[];
  loading: boolean;
  error: string | null;
  getEvents: () => Promise<void>;
  getEvent: (id: string) => Promise<Event>;
  getUserBookings: () => Promise<void>;
  createBooking: (eventId: number) => Promise<Booking>;
  createEvent: (eventData: Partial<Event>) => Promise<Event>;
  updateEvent: (id: number, eventData: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: number) => Promise<void>;
  isEventBooked: (eventId: number) => boolean;
}

interface EventProviderProps {
  children: ReactNode;
}

export const EventContext = createContext<EventContextType>({
  events: [],
  userBookings: [],
  loading: false,
  error: null,
  getEvents: async () => {},
  getEvent: async () => ({} as Event),
  getUserBookings: async () => {},
  createBooking: async () => ({} as Booking),
  createEvent: async () => ({} as Event),
  updateEvent: async () => ({} as Event),
  deleteEvent: async () => {},
  isEventBooked: () => false,
});

export const EventProvider = ({ children }: EventProviderProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    getEvents();
    if (isAuthenticated) {
      getUserBookings();
    }
  }, [isAuthenticated]);

  const getEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/api/events`);
      setEvents(res.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch events');
      setLoading(false);
    }
  };

  const getEvent = async (id: string): Promise<Event> => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${API_URL}/api/events/${id}`);
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch event');
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Failed to fetch event');
    }
  };

  const getUserBookings = async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      setError(null);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const res = await axios.get(`${API_URL}/api/bookings`, config);
      setUserBookings(res.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch bookings');
      setLoading(false);
    }
  };

  const createBooking = async (eventId: number): Promise<Booking> => {
    if (!token) throw new Error('Authentication required');
    
    try {
      setLoading(true);
      setError(null);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const res = await axios.post(`${API_URL}/api/bookings`, { eventId }, config);
      await getUserBookings();
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create booking');
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Failed to create booking');
    }
  };

  const createEvent = async (eventData: Partial<Event>): Promise<Event> => {
    if (!token) throw new Error('Authentication required');
    
    try {
      setLoading(true);
      setError(null);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const res = await axios.post(`${API_URL}/api/events`, eventData, config);
      await getEvents();
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create event');
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Failed to create event');
    }
  };

  const updateEvent = async (id: number, eventData: Partial<Event>): Promise<Event> => {
    if (!token) throw new Error('Authentication required');
    
    try {
      setLoading(true);
      setError(null);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      const res = await axios.put(`${API_URL}/api/events/${id}`, eventData, config);
      await getEvents();
      setLoading(false);
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update event');
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Failed to update event');
    }
  };

  const deleteEvent = async (id: number): Promise<void> => {
    if (!token) throw new Error('Authentication required');
    
    try {
      setLoading(true);
      setError(null);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      
      await axios.delete(`${API_URL}/api/events/${id}`, config);
      setEvents(events.filter(event => event.id !== id));
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete event');
      setLoading(false);
      throw new Error(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const isEventBooked = (eventId: number): boolean => {
    return userBookings.some(booking => booking.eventId === eventId);
  };

  return (
    <EventContext.Provider
      value={{
        events,
        userBookings,
        loading,
        error,
        getEvents,
        getEvent,
        getUserBookings,
        createBooking,
        createEvent,
        updateEvent,
        deleteEvent,
        isEventBooked
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;