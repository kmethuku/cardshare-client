import React, { useState, useContext, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { getUserService } from '../services/internalApi';
import FormControlElement from '../interfaces/FormControlElement';

const initialState = {
  email: '',
  password: '',
  error: '',
}

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

function LogInForm({ setLogin }: Props) {
  const authorized = useContext(AuthContext);
  if (!authorized) return null;
  const { logIn, setEmail, setUsername } = authorized;
  const router = useRouter();
  const [user, setUser] = useState(initialState)

  const handleLogIn = async (e: React.MouseEvent<HTMLElement>):Promise<void>  => {
    e.preventDefault();
    try {
      setUser({ ...user, error: '' })
      await logIn(user.email, user.password);
      setEmail(user.email);
      const username = await getUserService(user.email)
      setUsername(username[0].username)
      router.push('/discover');
    } catch (err) {
      setUser({ ...user, error: err.message});
    }
  }

  function handleChange(e: React.ChangeEvent<FormControlElement>) : void {
    const target = e.target as FormControlElement;
    const { name, value } = target;
    setUser({ ...user, [name]: value})
  }

  return (
    <div className="form-container">
          <form>
          {user.error && <p>{user.error}</p>}
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
