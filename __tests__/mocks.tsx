import React, { Dispatch, useContext, useState, useEffect, SetStateAction } from 'react';
import { auth } from '../firebase';

type Props = {
  children: JSX.Element,
}

interface AuthContextInterface {
  currentUser: {
    uid: string,
    email: string,
  },
  setCurrentUser: Dispatch<SetStateAction<any>>,
  setUsername: Dispatch<SetStateAction<any>>,
  setEmail: Dispatch<SetStateAction<any>>,
  email: string,
  username: string,
  signUp: (email: string, password: string) => void,
  signOut: () => void,
  logIn: (email: string, password: string) => void,

}

export const AuthContext = React.createContext<AuthContextInterface | null>(null)

export function useAuth() {
  return useContext(AuthContext);
}

type ICurrent = { uid: string; email: string };

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<ICurrent>({
    uid: "",
    email: "",
  });
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function signUp(email: string, password: string) {
    return Promise.resolve(true);
  }

  async function logIn(email: string, password: string) {
    return Promise.resolve(true)
  }

  async function signOut() {
    return Promise.resolve(true)
  }

  // useEffect(() => {
  //   const unsubscribe = Promise.resolve();
  //   return unsubscribe;
  // }, []);

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
