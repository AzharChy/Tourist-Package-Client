import React, { use, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const {loginUser, loginWithGoogle} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginUser(email, password);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      await axios.post('http://localhost:3000/jwt', { firebaseToken: idToken }, {
        withCredentials: true // ✅ Automatically sets cookie
      });

      Swal.fire("Login successfully done!");
      navigate(location.state?.from || '/');

    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong.',
      });
    }
  };
    

   const handleGoogleSignIn = async () => {
    try {
      const result = await loginWithGoogle();
      const googleUser = result.user;
      const idToken = await googleUser.getIdToken();

      // ✅ Send Google user's token to backend to set JWT cookie
      await axios.post('http://localhost:3000/jwt', { firebaseToken: idToken }, {
        withCredentials: true,
      });

      Swal.fire("Login successfully done!");
      navigate(location.state?.from || '/');
    } catch (error) {
      console.error("Google Login error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Something went wrong during login.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-600 px-4">
      <div className="w-full max-w-md bg-blue-600 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
          <div>
            <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
