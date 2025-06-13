import React from 'react';
import rail from '../assets/rail.jpg';
import { Link } from 'react-router';

const RaikTicket = () => {
    return (
        <div>
            <div>
                <h1 className='text-center text-3xl poppins-bold p-5'>Journey By Train</h1>
                <p className='poppins-light text-center text-xl p-5 w-3/4 mx-auto'>
                    Embark on a journey where the scenery through your window is as captivating as the destination itself. Travel through the heart of the land in comfort and style, watching the world's beauty unfold at a relaxing pace.
                </p>
            </div>

            <div className='relative w-fit mx-auto p-3'>
                <Link to='https://railapp.railway.gov.bd/splash/select-language'>
                    <img 
                        src={rail} 
                        alt='railway' 
                        className='transform scale-100 hover:scale-110 transition-transform duration-300'
                    />
                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded poppins-semibold'>
                        Click here to book your ticket
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default RaikTicket;
