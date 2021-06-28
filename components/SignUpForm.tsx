import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import  { signUpService } from '../services/internalApi';
import FormControlElement from '../interfaces/FormControlElement';
import { IAuthContext } from '../interfaces/IAuth';

const initialState = {
  username: '',
  email: '',
  password: '',
  error: '',
}

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const SignUpForm: React.FC<Props> = ({ setLogin }) => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const [user, setUser] = useState(initialState);
  const router: NextRouter = useRouter();
  const { signUp, setEmail, setUsername } = auth;

  const handleSignUp = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    try {
      setUser({ ...user, error: '' });
      await signUp(user.email, user.password);
      await signUpService({ username: user.username, email: user.email });
      setUsername(user.username);
      setEmail(user.email);
      router.push('/discover');
    } catch (err) {
      setUser({ ...user, error: 'Invalid username or password.' });
    }
  }

  const handleChange = (e: React.FormEvent<FormControlElement>) => {
    const target = e.target as FormControlElement;
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
    <div className="form-container">
      <form className="form-container__form">
        {user.error && <p>{user.error}</p>}
        <label className="form-container__label" htmlFor="username">Username:</label>
        <input
          className="form-container__input--blue"
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <label className="form-container__label" htmlFor="email">Email:</label>
        <input
          className="form-container__input--blue"
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <label className="form-container__label" htmlFor="password">Password:</label>
        <input
          className="form-container__input--blue"
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
      <a className="clickable" onClick={() => setLogin(true)}>
        Already have an account? Log In.
      </a>
    </div>
  );
}

export default SignUpForm;
