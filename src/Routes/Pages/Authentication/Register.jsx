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

  // ✅ Password validation
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  if (!passwordRegex.test(password)) {
    Swal.fire({
      icon: 'warning',
      title: 'Weak Password',
      text: 'Password must be at least 6 characters long, include an uppercase letter and a special character.',
    });
    return;
  }

  createUser(email, password)
    .then((result) => {
      const user = result.user;
      return updateProfile(user, {
        displayName: name,
        photoURL: photoUrl,
      }).then(() => user);
    })
    .then((user) => {
      return user.getIdToken().then((idToken) => {
        return axios.post(
          'https://tour-server-drab.vercel.app/jwt',
          { firebaseToken: idToken },
          { withCredentials: true }
        ).then(() => user);
      });
    })
    .then((user) => {
      const userProfile = {
        userId: user.uid,
        name,
        email,
        photoUrl,
      };

      return axios.post(
        'https://tour-server-drab.vercel.app/users',
        userProfile,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    })
    .then((res) => {
      console.log('User saved to DB:', res.data);
      Swal.fire("Registration Successful!").then(() => {
        navigate('/');
      });
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
