import {  useContext } from "react";

import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";
import { updateProfile } from "firebase/auth";

import Swal from "sweetalert2";
import axios from "axios";


const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    createUser(email, password)
  .then((result) => {
    const user = result.user;

    // ✅ Update profile in Firebase
    return updateProfile(user, {
      displayName: name,
      photoURL: photoUrl
    }).then(() => user); // return updated user
  })
  .then((user) => {
    // ✅ Get Firebase ID token
    return user.getIdToken().then((idToken) => {
      // Send token to backend to set cookie
      return axios.post(
        'http://localhost:3000/jwt',
        { firebaseToken: idToken },
        { withCredentials: true }
      ).then(() => user);
    });
  })
  .then((user) => {
    // ✅ Save user to database
    const userProfile = {
      userId: user.uid,
      name,
      email,
      photoUrl,
    };

    return axios.post(
      'http://localhost:3000/users',
      userProfile,
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  })
  .then((res) => {
    console.log('User saved to DB:', res.data);
    Swal.fire("Registration Successful!");
    navigate('/');
  })
  .catch((error) => {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error.message || 'Something went wrong during registration.',
    });
  });

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4">
      <div className="w-full max-w-md bg-white text-black p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
            />
          </div>

          <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              name="photoUrl"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 px-3 py-2 border"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
