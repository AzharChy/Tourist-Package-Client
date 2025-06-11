import React from 'react';
import errorImage from '../../assets/error.png'
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <h1 className='poppins-extralbold text-red-400 text-center text-3xl p-5'>
                OOps! You seem lost in the Madagaskar
            </h1>
        <img  src={errorImage}></img>   

        <div className='p-5'>
            <Link to='/'>
        <button className='text-2xl poppins-bold text-center rounded-2xl btn btn-primary p-5'>
            Return to Homepage
            </button></Link> 
        </div>
        </div>
    );
};

export default ErrorPage;