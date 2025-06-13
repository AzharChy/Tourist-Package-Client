import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Authentication/AuthContext';

const TourCard = ({ tour }) => {
  const {user} = use(AuthContext);
  const {
    tourName,
    image,
    duration,
   
    price,
    departureDate,
   
    guideName,
    guideEmail,
    guidePhoto
  } = tour;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row my-4">
      {/* Left Side Image */}
      <div className="relative md:w-1/2 w-full">
        <img
          src={image}
          alt={tourName}
          className="object-cover w-full h-64 md:h-full"
        />
        
      
       
      </div>

      {/* Right Side Info */}
      <div className="md:w-1/2 w-full p-10 flex flex-col justify-between bg-blue-300">
        <div>
          <h2 className="text-2xl poppins-bold text-gray-800 mb-2">{tourName}</h2>
          <p><span className="poppins-semibold">Duration:</span> {duration}</p>
          
          <p><span className="poppins-semibold">Departure Date:</span> {departureDate}</p>
          <p><span className="poppins-semibold">Price:</span> ৳{price}</p>
           <div className="  p-2 rounded text-center">
          {guideEmail ? (
            <>
              <img
                src={guidePhoto}
                alt={guideName}
                className="w-10 h-10 rounded-full mx-auto mb-1"
              />
              <p className="text-sm font-semibold">{guideName}</p>
              <p className="text-xs text-gray-600">{guideEmail}</p>
            </>
          ) : (
            <p className="poppins-light text-gray-500">No guide assigned</p>
          )}
        </div>
          
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          {user ?  (
            <Link to={`package/${tour._id}`}>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">
            View Details
          </button>
            </Link>
          )
            :
            <Link to='/login'>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200">
            View Details
          </button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default TourCard;
