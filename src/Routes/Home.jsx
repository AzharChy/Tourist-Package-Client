import React from 'react';
import ThemeToggle from '../ThemeToggle/Themetoggle';
import bannerImage from '../assets/bannere.jpg'
import { Link } from 'react-router';

const Home = () => {
    return (
        <div>
            {/* /* dark light mode */ }
           <ThemeToggle></ThemeToggle>

           {/* banner section */}
           <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row bg-orange-200">
    <img
      src={bannerImage}
      className="max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-5xl poppins-bold">Turn Miles Into Memories</h1>
      <p className="py-6 poppins-light">
       Every journey holds a story — let yours be unforgettable. Whether you're chasing sunsets on tropical shores or exploring hidden gems off the beaten path, we're here to make every mile count. Start your next adventure with us and create memories that last a lifetime.
      </p>
      <Link to='allPackages'>
      <button className="btn btn-primary">Explore All Packages</button></Link>
    </div>
  </div>
</div>

{/* /* featured packages section */ }
                   
                   <div>
                    <h1 className='poppins-bold text-3xl text-center m-5'>
                        Featured Packages
                    </h1>
                    <div>

                   </div>
        </div>
        </div>
    );
};

export default Home;