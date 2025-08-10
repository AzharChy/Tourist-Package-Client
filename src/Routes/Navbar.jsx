import React, { use, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { AuthContext } from './Pages/Authentication/AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import { GiDetour } from "react-icons/gi";

const Navbar = () => {
  const { user, logout } = use(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const navigate = useNavigate();

   useEffect(() => {
    if (user?.email) {
      axios.get(`https://tour-server-drab.vercel.app/users/${user.email}`, {
        withCredentials: true
      })
      .then(res => {
        setDbUser(res.data);
      })
      .catch(err => {
        console.error('User fetch error:', err);
      });
    }
  }, [user]);

  const handleLogout = () =>{
    logout()
    
    .then(()=>{
        
      Swal.fire("Logout Successfull!");
       navigate('/login')
    })
    .catch((error)=>{
      alert('something is wrong!!',error)
    })
  }

  const links = (
    <>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/allPackages'>All Packages</NavLink></li>
      {user && (
      <li><NavLink to='/myBookings'>My Bookings</NavLink></li>
    )}
   {user && (
     <li><NavLink to='addTourPackage'>Add Tour Package</NavLink></li>
   )}
   {user && (
     <li><NavLink to='myPackages'>My Packages</NavLink></li>
   )}
      <li><NavLink to='/aboutUs'>About Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-blue-300 shadow-sm">
      {/* Navbar Start (Logo + Mobile Dropdown) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
            <li className='block md:hidden mt-2 poppins-semibold'>
              {
                user && dbUser && (
                   <div className=" relative group">
          <img
            src={dbUser.photoUrl}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg z-10">
            {dbUser.name}
          </div>
        </div>
                )
              }
            </li>
          </ul>
        </div>
       <div className='flex gap-1 items-center justify-center'>
        <div className='text-2xl'>
          <GiDetour />
        </div>
        <div>
           <a className="btn btn-ghost text-xl poppins-extrabold text-white">Your Guide</a>
        </div>
       </div>
      </div>

      {/* Navbar Center (Navigation Links) */}
      <div className="navbar-center hidden lg:flex poppins-semibold text-white">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>

     {/* Navbar End (Auth Buttons) */}
<div className="navbar-end">
  {user ? (
    <div className="flex  items-center gap-4">
      {/* Logout Button */}
      <Link to="/login">
        <button onClick={handleLogout} className="btn btn-primary">
          Logout
        </button>
      </Link>
      

      {/* User Avatar with Tooltip */}
      {dbUser && (
        <div className="hidden md:block relative group">
          <img
            src={dbUser.photoUrl}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg z-10">
            {dbUser.name}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex gap-2">
      <Link to="/login">
        <button className="btn btn-primary">Login</button>
      </Link>
      <Link to="/register">
        <button className="btn btn-primary">Register</button>
      </Link>
    </div>
  )}
</div>

    </div>
  );
};

export default Navbar;
