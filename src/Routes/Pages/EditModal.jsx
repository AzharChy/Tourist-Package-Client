import React, { useState } from "react";
import axios from "axios";


const EditModal = ({ tour, closeModal, refresh }) => {
  const [formData, setFormData] = useState({
    tourName: tour.tourName,
    destination: tour.destination,
    price: tour.price,
    duration: tour.duration,
    departureDate: tour.departureDate || "",
    image: tour.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/addedTourPackages/${tour._id}`,
        formData,
        { withCredentials: true }
      );
      refresh();
      closeModal();
    } catch (err) {
      console.error("Error updating tour:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold mb-2">Edit Tour Package</h2>
        <input
          type="text"
          name="tourName"
          value={formData.tourName}
          onChange={handleChange}
          placeholder="Tour Name"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="input input-bordered w-full"
        />
        <input
          type="date"
          name="departureDate"
          value={formData.departureDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
        />
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes 
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
