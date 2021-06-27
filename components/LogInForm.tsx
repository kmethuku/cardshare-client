import React, { useState, useContext, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { getUserService } from '../services/internalApi';
import FormControlElement from '../interfaces/FormControlElement';
import Link from 'next/link';

const initialState = {
  email: '',
  password: '',
  error: '',
}

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const LogInForm: React.FC<Props> = ({ setLogin }) => {
  const authorized = useContext(AuthContext);
  const router = useRouter();
  if (!authorized)
    return (
      <h2 className="header">You are not authorized to access this page. Please
        <Link href="/">log in</Link>
        to gain access.
      </h2>
    )
  const { logIn, setEmail, setUsername } = authorized;
  const [user, setUser] = useState(initialState)

  const handleLogIn = async (e: React.MouseEvent<HTMLElement>):Promise<void>  => {
    e.preventDefault();
    try {
      setUser({ ...user, error: '' })
      logIn(user.email, user.password);
      setEmail(user.email);
      const username = await getUserService(user.email);
      setUsername(username[0].username);
      router.push('/discover');
    } catch (err) {
      setUser({ ...user, error: err.message });
    }
  }

  function handleChange(e: React.ChangeEvent<FormControlElement>) : void {
    const target = e.target as FormControlElement;
    const { name, value } = target;
    setUser({ ...user, [name]: value})
  }

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
      <a onClick={() => setLogin(false)}>
        Don't have an account? Sign Up.
      </a>
    </div>
  );
}

export default LogInForm;
