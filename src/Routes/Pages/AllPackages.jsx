import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TourCard from './PropPages/TourCArd';

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [search, setSearch] = useState([]);
       


    useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(`https://tour-server-drab.vercel.app/addedTourPackages?search=${search}`, {
          withCredentials: true
        });
        setPackages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackages();
  }, [search]);

    return (
        <div className='p-4'>
            <input type='text' value={search} onChange={(e)=>{
                setSearch(e.target.value)
            }} placeholder='Search Tour or Destination'></input>
            {packages.length === 0 ? (
  <p className="text-center text-gray-500 mt-10">No results found.</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {packages.map(tour => (
      <TourCard key={tour._id} tour={tour} />
    ))}
  </div>
)}

        </div>
    );
};

export default AllPackages;
