import { Dispatch, SetStateAction } from 'react';

export interface IAuthContext {
  currentUser: ICurrent,
  setCurrentUser: Dispatch<SetStateAction<ICurrent>>,
  setUsername: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  email: string,
  username: string,
  signUp: (email: string, password: string) => void,
  signOut: () => void,
  logIn: (email: string, password: string) => void,
}

export interface ICurrent {
  uid: string | undefined,
  email: string | undefined | null,
}
