import React from 'react';
import { useLoaderData } from 'react-router';

const TourDetails = () => {
  const tour = useLoaderData();

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
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourDetails;
