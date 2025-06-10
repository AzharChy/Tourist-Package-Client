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
          await fetch('http://localhost:3000/jwt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firebaseToken }),
            credentials: 'include' // 👈 ensure cookie is set properly
          });

          console.log("JWT cookie set by backend ✅");
        } catch (error) {
          console.error('Error setting JWT cookie:', error);
        }
      } else {
        // You can optionally call a backend route to clear the cookie on logout
        await fetch('http://localhost:3000/logout', {
          method: 'POST',
          credentials: 'include'
        });
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