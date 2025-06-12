import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './Pages/Authentication/AuthContext';
import { Link } from 'react-router';

const FeaturedPackages = () => {
  // Use useContext instead of the experimental `use`
  const { user } = use(AuthContext); 
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/addedTourPackages')
      .then((res) => {
        // Only take the first 6 packages
        setPackages(res.data.slice(0, 6));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Featured Tour Packages</h2>
      
      {/* Grid for the packages */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={pkg.image}
              alt={pkg.tourName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{pkg.tourName}</h3>

                {/* Guide Info */}
                <div className="flex items-center mb-2">
                  {pkg.guidePhoto ? (
                    <img
                      src={pkg.guidePhoto}
                      alt={pkg.guideName}
                      className="w-8 h-8 rounded-full mr-2 object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-xs text-gray-600">
                      N/A
                    </div>
                  )}
                  <p className="text-sm text-gray-700">
                    {pkg.guideName || 'No Guide Assigned'}
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {pkg.duration}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Departure:</strong> {pkg.departureDate}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> ৳{pkg.price}
                </p>
              </div>

              {/* View Details Button */}
               <Link to={`/package/${pkg._id}`} className="w-full mt-4">
                 <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition w-full">
                    View Details
                 </button>
               </Link>
            </div>
          </div>
        ))}
      </div>

      {/* "Show All" Button Section - Placed outside and below the grid */}
      <div className="text-center mt-8">
        <Link to={user ? '/allPackages' : '/login'}>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition">
            Show All Packages
          </button>
        </Link>
      </div>
    </div>
  );
};


export default FeaturedPackages;
