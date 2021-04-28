import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  async function signUp (email, password) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  async function logIn (email, password) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async function signOut () {
    return await auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      //User randomly will become null at some point while using the app,
      //so they won't be able to access the page. If you go to /discover, it will work again,
      //but if you create a new deck, the username will not be recognized so the deck will have a
      //creator field as ''. This is why I wrote the if..else statement below, so the user can still
      //view the pages
      if (user === null) setCurrentUser({uid: 'waiting...', username: 'waiting...', email: 'waiting...'})
      else setCurrentUser(user);
    })
    return unsubscribe;
  }, [])


  const value = {
    currentUser,
    setCurrentUser,
    username,
    setUsername,
    email,
    setEmail,
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
