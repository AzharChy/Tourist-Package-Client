import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TourCard from './PropPages/TourCArd';

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

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

  // Sort packages based on sortOrder and price
  const sortedPackages = [...packages].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <div className='p-4'>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Tour or Destination'
        className="mb-4 p-2 border border-gray-300 rounded"
      />

      {/* Sorting dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-semibold">Sort by Price:</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {sortedPackages.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No results found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedPackages.map(tour => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPackages;
