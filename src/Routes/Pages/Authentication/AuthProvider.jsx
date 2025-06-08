import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { AuthContext } from './AuthContext';


const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
 

    // create user with email and apssword
    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth, email, password)  
    }

    // login wit hemail and apss

    const authData = {
        user,
        setUser,
        createUser,
        loading
    }
    return (
       <AuthContext.Provider value={authData}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;