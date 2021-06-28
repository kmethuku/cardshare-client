import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { IAuthContext, ICurrent } from '../interfaces/IAuth';

export const AuthContext = React.createContext<IAuthContext | null>(null);

type Props = {
  children: JSX.Element,
}

export function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<ICurrent>({
    uid: '',
    email: '',
  });
  const [username, setUsername] = useState<string>(''); // is this being used?
  const [email, setEmail] = useState<string>('');

  async function signUp(email: string, password: string) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  async function logIn(email: string, password: string) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async function signOut() {
    return await auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser({
        uid: user?.uid,
        email: user?.email
      });
      setLoading(false);
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
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>);
}
