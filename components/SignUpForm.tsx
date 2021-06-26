import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import  { signUpService } from '../services/internalApi';
import FormControlElement from '../interfaces/FormControlElement';

const initialState = {
  username: '',
  email: '',
  password: '',
  error: '',
}

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const SignUpForm = ({setLogin}: Props) => {
  const [user, setUser] = useState(initialState)
  const router = useRouter();
  const auth = useContext(AuthContext);
  if (!auth) return null;

  const { signUp, setCurrentUser, setEmail, setUsername } = auth;

  const handleSignUp = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    try {
      setUser({ ...user, error: '' })
      await signUp(user.email, user.password)
      await signUpService({ username: user.username, email: user.email })
      setUsername(user.username)
      setEmail(user.email)
      router.push('/discover');
    } catch (error) {
      setUser({ ...user, error: error.message })
    }
  }

  const handleChange = (e: React.FormEvent<FormControlElement>) => {
    const target = e.target as FormControlElement;
    const {name, value} = target;
    setUser({
      ...user,
      [name]: value,
    })
  }

  return (
    <div className="form-container">
      <form>
        {user.error && <p>{user.error}</p>}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          onClick={handleSignUp}
          disabled={!user.username || !user.email || !user.password}
        >
          Sign Up
        </button>
      </form>
      <a onClick={() => setLogin(true)}>
        Already have an account? Log In.
      </a>
    </div>
  );
}

export default SignUpForm
