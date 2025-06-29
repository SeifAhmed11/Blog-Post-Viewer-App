import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import EventContext, { Event } from '../../context/EventContext';

const eventSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  category: z.string().min(1, { message: 'Category is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  venue: z.string().min(3, { message: 'Venue must be at least 3 characters' }),
  price: z.number().min(0, { message: 'Price must be 0 or greater' }),
  image: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
});

type EventFormValues = z.infer<typeof eventSchema>;

const AdminEventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createEvent, updateEvent, getEvent } = useContext(EventContext);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id);
  const [apiError, setApiError] = useState<string | null>(null);

  const isEditMode = !!id;

  const { 
    register, 
    handleSubmit,
    reset,
    formState: { errors } 
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      date: '',
      venue: '',
      price: 0,
      image: '',
    }
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const event = await getEvent(id);
          
          // Format the date for the datetime-local input
          const eventDate = new Date(event.date);
          const formattedDate = format(eventDate, "yyyy-MM-dd'T'HH:mm");
          
          reset({
            ...event,
            date: formattedDate,
          });
        } catch (err) {
          setApiError('Failed to fetch event details');
        } finally {
          setInitialLoading(false);
        }
      }
    };

    fetchEvent();
  }, [id, getEvent, reset]);

  const onSubmit = async (data: EventFormValues) => {
    try {
      setLoading(true);
      setApiError(null);
      
      if (isEditMode && id) {
        await updateEvent(parseInt(id), data);
      } else {
        await createEvent(data);
      }
      
      navigate('/admin');
    } catch (err: any) {
      setApiError(err.message || 'Failed to save event');
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Event' : 'Create New Event'}
          </h1>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {apiError && (
          <div className="p-4 bg-red-50 border-l-4 border-red-400">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{apiError}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title*
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="title"
                  {...register('title')}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.title ? 'border-red-300' : ''
                  }`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  rows={4}
                  {...register('description')}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.description ? 'border-red-300' : ''
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category*
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  {...register('category')}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.category ? 'border-red-300' : ''
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="Concert">Concert</option>
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Exhibition">Exhibition</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date & Time*
              </label>
              <div className="mt-1">
                <input
                  type="datetime-local"
                  id="date"
                  {...register('date')}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.date ? 'border-red-300' : ''
                  }`}
                />
                {errors.date && (
                  <p className="mt-2 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                Venue*
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="venue"
                  {...register('venue')}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.venue ? 'border-red-300' : ''
                  }`}
                />
                {errors.venue && (
                  <p className="mt-2 text-sm text-red-600">{errors.venue.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price* ($)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="price"
                  min="0"
                  step="0.01"
                  {...register('price', { valueAsNumber: true })}
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.price ? 'border-red-300' : ''
                  }`}
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL (optional)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="image"
                  {...register('image')}
                  placeholder="https://example.com/image.jpg"
                  className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${
                    errors.image ? 'border-red-300' : ''
                  }`}
                />
                {errors.image && (
                  <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Leave blank to use default image
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="mr-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : isEditMode ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEventForm;