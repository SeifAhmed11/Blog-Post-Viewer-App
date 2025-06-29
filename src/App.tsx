import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingConfirmation from './pages/BookingConfirmation';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEventForm from './pages/admin/AdminEventForm';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/confirmation/:id" element={
                  <ProtectedRoute>
                    <BookingConfirmation />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/events/new" element={
                  <AdminRoute>
                    <AdminEventForm />
                  </AdminRoute>
                } />
                <Route path="/admin/events/edit/:id" element={
                  <AdminRoute>
                    <AdminEventForm />
                  </AdminRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;