import React, { use, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { AuthContext } from '../Routes/Pages/Authentication/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const TourDetails = () => {
  const tour = useLoaderData();
  const { user } = use(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const currentDate = new Date().toLocaleString(); // fixed here
  const navigate = useNavigate();
  const handleBooking = async () => {
  setBookingLoading(true);

  const booking = {
    tourId: tour._id,
    tourName: tour.tourName,
    price: tour.price,
    buyerName: user.displayName,
    buyerEmail: user.email,
    date: currentDate,
    note: specialNote,
  };

  try {
    await axios.post('http://localhost:3000/bookings', booking, { withCredentials: true });
    await axios.patch(`http://localhost:3000/addedTourPackages/${tour._id}/incrementBooking`);

    Swal.fire('Success!', 'Tour booked successfully.', 'success');
    setShowModal(false);
    navigate('/myBookings'); 
  } catch (err) {
    console.error(err);
    Swal.fire('Error', 'Booking failed', 'error');
  } finally {
    setBookingLoading(false);
  }
};


  if (!tour) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Top Section: Image + Tour Info */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image Left */}
        <div className="w-full md:w-1/2">
          <img
            src={tour.image}
            alt="Tour"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Info Right */}
        <div className="w-full md:w-1/2 space-y-3">
          <h2 className="text-2xl font-bold">{tour.tourName}</h2>
          <p><strong>Duration:</strong> {tour.duration}</p>
          <p><strong>Price:</strong> ৳{tour.price}</p>
          <p><strong>Departure Location:</strong> {tour.departureLocation}</p>
          <p><strong>Departure Date:</strong> {tour.departureDate}</p>
          <p><strong>Destination:</strong> {tour.destination}</p>
          <p><strong>Booking Count:</strong> {tour.bookingCount || 0}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-2">Package Description</h3>
        <p className="text-gray-700">{tour.packageDetails}</p>
      </div>

      {/* Guide Info */}
      <div className="mt-10 text-center">
        <h3 className="text-xl font-semibold mb-4">Tour Guide</h3>
        {tour.guideEmail ? (
          <div className="flex flex-col items-center">
            <img
              src={tour.guidePhoto || 'https://via.placeholder.com/50'}
              alt={tour.guideName || 'Guide'}
              className="w-16 h-16 rounded-full mb-2"
            />
            <p><strong>{tour.guideName || 'No Name Provided'}</strong></p>
            <p>{tour.guideEmail}</p>
            <p>{tour.contactNo}</p>
          </div>
        ) : (
          <p className="text-gray-500">No guide assigned</p>
        )}
      </div>

      {/* Book Now Button */}
      <div className="mt-10 text-center">
        <button
  onClick={handleBooking}
  disabled={bookingLoading}
  className={`px-4 py-2 text-white rounded ${bookingLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
>
  {bookingLoading ? 'Booking...' : 'Confirm Booking'}
</button>

      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Your Booking</h2>
            <p><strong>Tour:</strong> {tour.tourName}</p>
            <p><strong>Price:</strong> ৳{tour.price}</p>
            <p><strong>Name:</strong> {user.displayName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Date:</strong> {currentDate}</p>
            <textarea
              className="w-full mt-3 p-2 border rounded"
              rows="3"
              placeholder="Special Note"
              onChange={(e) => setSpecialNote(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
              <button onClick={handleBooking} className="px-4 py-2 bg-blue-600 text-white rounded">Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
