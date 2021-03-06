import React, { useState, useContext, SetStateAction, Dispatch } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { getUserService } from '../services/internalApi';
import FormControlElement from '../interfaces/FormControlElement';
import { IAuthContext } from '../interfaces/IAuth';
import Loader from './loader';

const initialState = {
  email: '',
  password: '',
  error: '',
}

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const LogInForm: React.FC<Props> = ({ setLogin }) => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const { logIn, setEmail, setUsername } = auth;
  const [user, setUser] = useState(initialState);
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogIn = async (e: React.MouseEvent<HTMLElement>): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      setUser({ ...user, error: '' });
      await logIn(user.email, user.password);
      setEmail(user.email);
      const username = await getUserService(user.email);
      setUsername(username[0].username);
      setLoading(false);
      router.push('/discover');
    } catch (err) {
      setLoading(false);
      if (err.code.includes('auth/')) setUser({ ...user, error: err.message });
      else setUser({ ...user, error: 'An error occurred. Please try again.' });
    }
  }

  function handleChange(e: React.ChangeEvent<FormControlElement>): void {
    const target = e.target as FormControlElement;
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  }

  if (loading) return <Loader/>;
  return (
    <div className="form-container">
      <form className="form-container__form">
        {user.error && <p>{user.error}</p>}
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
          onClick={handleLogIn}
          disabled={!user.email || !user.password}
        >
          Log In
        </button>
      </form>
      <a className="clickable" onClick={() => setLogin(false)}>
        Don't have an account? Sign Up.
      </a>
    </div>
  );
}

export default LogInForm;
