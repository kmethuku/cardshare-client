import {Dispatch, SetStateAction } from 'react'

export interface IAuthContext {
  currentUser: ICurrentUser,
  setCurrentUser: Dispatch<SetStateAction<ICurrentUser>>,
  setUsername: Dispatch<SetStateAction<string>>,
  setEmail: Dispatch<SetStateAction<string>>,
  email: string,
  username: string,
  signUp: (email: string, password: string) => void,
  signOut: () => void,
  logIn: (email: string, password: string) => void,
}

export interface ICurrentUser {
  uid: string,
  email: string,
}

export interface ICurrent { uid: string; email: string }