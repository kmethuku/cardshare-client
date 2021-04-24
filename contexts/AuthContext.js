import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  async function signUp (email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  async function logIn (email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async function signOut () {
    return await auth.signOut();
  }

  // function logIn (email, password) {
  //   // function to authenticate user signInWithEmailandPassword(email, password)
  //   // generate an ID token
  //   // use to identify user in database

  //   //signOut
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    })
    return unsubscribe;
  }, [])


  const value = {
    currentUser,
    signUp,
    logIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
