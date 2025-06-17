import React from 'react';
import ThemeToggle from '../ThemeToggle/Themetoggle';
import bannerImage from '../assets/bannere.jpg'
import { Link } from 'react-router';
import FeaturedPackages from './FeaturedPackages';
import FlyAir from '../Homepage Component/FlyAir';
import RaikTicket from '../Homepage Component/RaikTicket';
import Marquee from "react-fast-marquee";

const Home = () => {
  return (
    <div className="bg-base-200">
      {/* Top bar with theme toggle */}
      <div className="p-4">
        <ThemeToggle />
      </div>

      {/* Banner Section */}
     <div className="hero bg-blue-300 py-10 px-4">
  <div className="hero-content flex-col lg:flex-row gap-10">
    <img
      src={bannerImage}
      className="w-full max-w-sm rounded-lg shadow-2xl"
      alt="Banner"
    />
    <div className="w-full text-center lg:text-left">
      <h1 className="text-3xl md:text-5xl font-bold poppins-bold">
        Turn Miles Into Memories
      </h1>
      <p className="py-6 poppins-light">
        Every journey holds a story — let yours be unforgettable. Whether you're chasing
        sunsets on tropical shores or exploring hidden gems off the beaten path, we're
        here to make every mile count. Start your next adventure with us and create
        memories that last a lifetime.
      </p>
      <Link to="/allPackages">
        <button className="btn btn-primary">Explore All Packages</button>
      </Link>
    </div>
  </div>
</div>


      <div>
        {/* Featured Packages Section */}
      <FeaturedPackages />
        </div>
        <div>
          <FlyAir></FlyAir>
        </div>
        <div>
          <RaikTicket></RaikTicket>
        </div>
        <div>
           <Marquee gradient={false} speed={50} pauseOnHover={true}>
        <span className="text-blue-700 font-medium text-lg">
          Thanks for visiting our website. For any info contact us — tour@gmail.com
        </span>
      </Marquee>
        </div>
    </div>
  );
};

export default Home;