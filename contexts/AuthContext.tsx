import React, { Dispatch, useContext, useState, useEffect, SetStateAction } from 'react';
import { auth } from '../firebase';
import { IAuthContext, ICurrent } from '../interfaces/IAuth'

export const AuthContext = React.createContext<IAuthContext | null>(null)

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<ICurrent>({
    uid: "",
    email: "",
  });
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function signUp(email: string, password: string) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  async function logIn(email: string, password: string) {
    return await auth.signInWithEmailAndPassword(email, password);
  }

  async function signOut() {
    return await auth.signOut();
  }
  //User randomly will become null at some point while using the app,
  //so they won't be able to access the page. If you go to /discover, it will work again,
  //but if you create a new deck, the username will not be recognized so the deck will have a
  //creator field as ''. This is why I wrote the if..else statement below, so the user can still
  //view the pages

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null || user.uid === null || user.email === null) {
        setCurrentUser({
          ...currentUser,
          uid: "waiting...",
          email: "waiting...",
        });
      } else
        setCurrentUser({
          uid: user.uid,
          email: user.email,
        });
    });
    return unsubscribe;
  }, []);

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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

type Props = {
  children: JSX.Element,
}
