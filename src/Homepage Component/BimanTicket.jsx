import axios from 'axios';
import React, { useState } from 'react';

const BimanTicket = () => {
  // State to hold the values of the input fields
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: '',
    requiredLink: ''
  });

  // A single handler to update the state for any input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)
    
    // console.log('Form Submitted with data:', formData);

    // Send the form data to the server when the form is submitted
    axios.post('https://tour-server-drab.vercel.app/airlines', formData)
      .then((res) => {
        console.log('Server response:', res.data);
        alert(`Form submitted successfully!`);
        // Optional: Clear the form after successful submission
        setFormData({
            name: '',
            imageUrl: '',
            requiredLink: ''
        });
      })
      .catch((error) => {
        console.error('There was an error submitting the form:', error);
        alert('Failed to submit the form. Please try again.');
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Submit Your Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter a name"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Image URL Input Field */}
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/image.png"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Required Link Input Field */}
          <div>
            <label htmlFor="requiredLink" className="block text-sm font-medium text-gray-700">
              Required Link
            </label>
            <input
              type="url"
              id="requiredLink"
              name="requiredLink"
              value={formData.requiredLink}
              onChange={handleInputChange}
              placeholder="https://example.com"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BimanTicket;