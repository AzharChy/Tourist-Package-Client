import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TourCard from './PropPages/TourCArd';


const AllPackages = () => {
     const [packages, setPackages] = useState([]);
     useEffect(()=>{
        axios.get('http://localhost:3000/addedTourPackages',{
            withCredentials: true
        })
        .then((res)=>{
           setPackages(res.data)
     })
        .catch((error)=>{
            console.log(error)
     })
     },[])
    return (
        <div className='p-4'>
          
           {packages.map(tour=>(
           <TourCard key={tour._id} tour={tour}></TourCard>
           ))}
        </div>
    );
};

export default AllPackages;