import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyBookings = () => {
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeDuplicates = (bookings) => {
    const seen = new Set();
    return bookings.filter((booking) => {
      if (seen.has(booking.tourId)) return false;
      seen.add(booking.tourId);
      return true;
    });
  };

  const fetchBookings = () => {
    setLoading(true);
    axios.get('http://localhost:3000/bookings', { withCredentials: true })
      .then(res => {
        const uniqueBookings = removeDuplicates(res.data);
        setBookings(uniqueBookings);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load bookings:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = (bookingId) => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:3000/booking/${bookingId}`, {
            withCredentials: true,
          });

          if (response.data.deletedCount > 0) {
            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
            setBookings(bookings.filter(b => b._id !== bookingId));
          } else {
            Swal.fire('Error', 'Booking not found or already deleted.', 'error');
          }
        } catch (err) {
          console.error('Delete failed:', err);
          Swal.fire('Error', 'Server error while cancelling booking.', 'error');
        }
      }
    });
  };

  const handleConfirm = async (bookingId) => {
  try {
    const res = await axios.patch(`http://localhost:3000/booking/${bookingId}/confirm`, {}, {
      withCredentials: true
    });

    if (res.data.message) {
      // Update the UI
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status: 'Completed' } : b)
      );
    }
  } catch (error) {
    console.error('Error confirming booking:', error);
    Swal.fire('Error', 'Failed to confirm booking.', 'error');
  }
};

  if (loading) return <p className="text-center text-xl p-10">Loading your bookings...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Tour</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={booking.img} alt={`Tour of ${booking.tourName}`} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{booking.tourName}</div>
                        <div className="text-sm opacity-50">{booking.destination}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p><strong>Price:</strong> ৳{booking.price}</p>
                    <p><strong>Booking Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                    <p><strong>Departure:</strong> {booking.departure} from {booking.location}</p>
                    <p><strong>Guide:</strong> {booking.guideName} ({booking.contact})</p>
                    <p><strong>Note:</strong> {booking.note || 'None'}</p>
                  </td>
                  <td>
                    <span className={`badge ${booking.status === 'Completed' ? 'badge-success' : 'badge-accent'}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="flex flex-col gap-2">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-warning btn-sm"
                      disabled={booking.status === 'Completed'}
                    >
                      Cancel
                    </button>
                   <button
  onClick={() => handleConfirm(booking._id)}
  className="btn btn-primary btn-sm"
  disabled={booking.status === 'Completed'}
>
  {booking.status === 'Completed' ? 'Confirmed' : 'Confirm'}
</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Tour</th>
                <th>Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
