import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { AuthContext } from './AuthContext';


const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
   const provider = new GoogleAuthProvider();

    // create user with email and apssword
    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth, email, password)  
    }

    // login wit hemail and apss

    const loginUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    // login via google

    const loginWithGoogle = ()=>{
        return signInWithPopup(auth, provider)
    }

    // logout

    const logout = () =>{
        return signOut(auth);
    }

    // obserever 

   useEffect(()=>{
     const unSubscribe =  onAuthStateChanged(auth, (currentUser)=>{
        setUser(currentUser);
        setLoading(false);
     })
    }
   ,[])

    const authData = {
        user,
        setUser,
        createUser,
        loading,
       
        logout,
        loginWithGoogle,
        loginUser
    }
    return (
       <AuthContext.Provider value={authData}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;