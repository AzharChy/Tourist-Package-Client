import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthContext';
import axios from 'axios';

const MyBookings = () => {
    const {user} = use(AuthContext);
    const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    axios.get('http://localhost:3000/bookings', { withCredentials: true })
      .then(res => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load bookings:', err);
        setLoading(false);
      });
  }, []);

  
  if (loading) return <p className="text-center">Loading your bookings...</p>;
    return (
        <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="border p-4 rounded shadow-md bg-white">
              <h3 className="text-lg font-semibold">{booking.tourName}</h3>
              <p><strong>Price:</strong> ৳{booking.price}</p>
              <p><strong>Booking Date:</strong> {booking.date}</p>
              <p><strong>Special Note:</strong> {booking.note || 'None'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    );
};

export default MyBookings;