import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './Authentication/AuthContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddTourPackage = () => {
    const [guide, setGuide] = useState({});
     const [formData, setFormData] = useState({
    tourName: "",
    image: "",
    duration: "",
    departureLocation: "",
    destination: "",
    price: "",
    departureDate: "",
    packageDetails: "",
    contactNo: "",
  });
  const {user} = use(AuthContext);

//   fetch guideinfo from firebase

useEffect(()=>{
   if (user){
    setGuide({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
    })
   }
},[user]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    const packageData = {
      ...formData,
      guideName: guide.name,
      guideEmail: guide.email,
      guidePhoto: guide.photo,
    };

    try{
       await axios.post('https://tour-server-drab.vercel.app/addedTourPackages',packageData,{
          withCredentials: true,
       });
          Swal.fire("Tour package added successfully!");
           setFormData({
        tourName: "",
        image: "",
        duration: "",
        departureLocation: "",
        destination: "",
        price: "",
        departureDate: "",
        packageDetails: "",
        contactNo: "",
      });
    }


    catch(error){
      Swal.fire("Failed to add tour package.");
      console.error(error);
    }

}
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Tour Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="tourName" placeholder="Tour Name" className="input input-bordered w-full" onChange={handleChange} value={formData.tourName} required />
        <input type="text" name="image" placeholder="Image URL" className="input input-bordered w-full" onChange={handleChange} value={formData.image} required />
        <input type="text" name="duration" placeholder="Duration (e.g., 3 Days 2 Nights)" className="input input-bordered w-full" onChange={handleChange} value={formData.duration} required />
        <input type="text" name="departureLocation" placeholder="Departure Location" className="input input-bordered w-full" onChange={handleChange} value={formData.departureLocation} required />
        <input type="text" name="destination" placeholder="Destination" className="input input-bordered w-full" onChange={handleChange} value={formData.destination} required />
        <input type="number" name="price" placeholder="Price" className="input input-bordered w-full" onChange={handleChange} value={formData.price} required />
        <input type="date" name="departureDate" className="input input-bordered w-full" onChange={handleChange} value={formData.departureDate} required />
        <textarea name="packageDetails" placeholder="Package Details" className="textarea textarea-bordered w-full" rows={4} onChange={handleChange} value={formData.packageDetails} required></textarea>
        <input type="text" name="contactNo" placeholder="Contact No." className="input input-bordered w-full" onChange={handleChange} value={formData.contactNo} required />

        {/* Guide Info (readonly) */}
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2">Guide Information (Auto-filled)</h3>
          <input type="text" value={guide.name || ""} readOnly className="input input-bordered w-full" />
          <input type="text" value={guide.email || ""} readOnly className="input input-bordered w-full mt-2" />
          <input type="text" value={guide.photo || ""} readOnly className="input input-bordered w-full mt-2" />
        </div>

        <button type="submit" className="btn btn-primary w-full">Submit Tour Package</button>
      </form>
      {/* <Toaster position="top-right" /> */}
    </div>
    );
};

export default AddTourPackage;