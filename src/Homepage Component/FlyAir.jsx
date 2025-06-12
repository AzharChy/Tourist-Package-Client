import axios from 'axios';
import React, { useEffect, useState } from 'react';

// The number of cards to show initially
const initial_sm_screen = 4;

const FlyAir = () => {
    // State for all airlines fetched from the backend
    const [airlines, setAirlines] = useState([]);
    
    // State to track if the user has clicked "Show More"
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/airlines')
            .then((res) => {
                setAirlines(res.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the airlines:", error);
            });
    }, []);

    // Determine which airlines to display based on the `isExpanded` state
    const displayedAirlines = isExpanded ? airlines : airlines.slice(0, initial_sm_screen);

    return (
        <div className="py-12 bg-gray-50">
            <div className='max-w-7xl mx-auto px-4'>
                <h1 className='text-center poppins-bold text-3xl md:text-4xl text-gray-800'>
                    Search Top Airlines
                </h1>
                <p className='text-center text-base md:text-lg text-gray-500 poppins-regular w-full md:w-7/12 mx-auto p-5'>
                    ShareTrip's user-friendly platform connects you to top airlines instantly. Enjoy a comfortable and hassle-free journey on any destination and get tickets of top airlines easily.
                </p>
            </div>

            <div className="max-w-7xl mx-auto p-4">
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                   
                    {displayedAirlines.map((airline) => (
                        <a
                            key={airline._id}
                            href={airline.requiredLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center h-40 text-center transition-transform transform hover:scale-105 hover:shadow-xl"
                        >
                            <img
                                src={airline.imageUrl}
                                alt={`${airline.name} logo`}
                                className="max-h-20 max-w-full object-contain mb-4"
                            />
                            <h3 className="font-semibold text-gray-700">{airline.name}</h3>
                        </a>
                    ))}
                </div>

                {/* The "Show More" button is displayed only if the view is NOT expanded 
                  AND if there are more airlines to show than are initially visible.
                */}
                {!isExpanded && airlines.length > initial_sm_screen && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setIsExpanded(true)}
                            className="bg-blue-600 text-white font-bold py-2 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        >
                            Show More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlyAir;