import React, { Suspense } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router';

const root = () => {
    return (
        <div>
            <Suspense>
                <Navbar>
                    
                </Navbar>
                <main className='w-11/12 mx-auto'>
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </Suspense>
        </div>
    );
};

export default root;