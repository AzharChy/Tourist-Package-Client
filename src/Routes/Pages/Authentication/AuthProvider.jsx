import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // Create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login via Google
  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  // Logout
  const logout = () => {
    return signOut(auth);
  };

  // Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

     if (currentUser) {
  const firebaseToken = await currentUser.getIdToken();

  try {
    const response = await fetch('http://localhost:3000/jwt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firebaseToken }),
    });

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('tourist-site-token', data.token);
      console.log('JWT saved to localStorage:', data.token);
    } else {
      console.error('No token in response');
    }

  } catch (error) {
    console.error('Error getting JWT from backend:', error);
  }
} else {
  localStorage.removeItem('tourist-site-token');
}

    });

    return unSubscribe;
  }, []);

  const authData = {
    user,
    setUser,
    createUser,
    loading,
    logout,
    loginWithGoogle,
    loginUser
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
