import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { Form, Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Card from '../components/Card'
import  { signUpService } from '../services/internalApi';
import FormControlElement from '../interfaces/FormControlElement';

function SignupOrLoginForm() {
  const [label, setLabel] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({username: '', email: '', password: ''});
  const authorized = useContext(AuthContext);
  if (!authorized) return null;
  const { signUp, logIn, currentUser, setCurrentUser, setUsername, setEmail } = authorized;
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignUp(e: React.MouseEvent<HTMLElement>):Promise<void> {
    e.preventDefault();
    try {
      setError('');
      await signUp(userInfo.email, userInfo.password);
      const newUser = {
        username: userInfo.username,
        email: userInfo.email,
      }
      let result = await signUpService(newUser);
      console.log(result)
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      router.push('/discover');
    } catch (err) {
      console.log(err)
      setError('Failed to create an account.');
    }
  }

  async function handleLogIn(e: React.MouseEvent<HTMLElement>):Promise<void>  {
    e.preventDefault();
    try {
      setError('');
      await logIn(userInfo.email, userInfo.password);
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      router.push('/discover');
    } catch (err) {
      setError('Incorrect username or password.');
    }
  }

  function handleChange(e: React.ChangeEvent<FormControlElement>) : void {
    const target = e.target
    if (target.name === 'username') {
      setUserInfo({
        ...userInfo,
        username: target.value})}
    else if (target.name === 'email') {
      setUserInfo({
        ...userInfo,
        email: target.value})
    } else {
      setUserInfo({
        ...userInfo,
        password: target.value})
    }
  }
  console.log(userInfo)
  return (
    <Card>
        <h2>{label}</h2>
          <form className="form-control" data-testid="form">
          {error && <p>{error}</p>}
          {label === "Sign Up" && (
              <TextField
                className="textfield"
                autoComplete="off"
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                label="Username"
                required
              />
          )}
          <>
            <TextField
              className="textfield"
              autoComplete="off"
              type="email"
              label="Email"
              value={userInfo.email}
              onChange={handleChange}
              required
            />
          </>
          <>
            <TextField
              className="textfield"
              autoComplete="off"
              type="password"
              name="password"
              label="Password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
          </>
          <button
            name="signup"
            className="btn btn-primary"
            type="submit"
            onClick={label === "Sign Up" ? handleSignUp : handleLogIn}
          >
            {label}
          </button>
        </form>
        {label === "Sign Up" ? (
          <div
            onClick={() => setLabel("Log In")}
          >
            Already have an account? Log In
          </div>
        ) : (
          <div
            onClick={() => setLabel("Sign Up")}
          >
            Don&apos;t have an account? Sign Up
          </div>
        )}
    </Card>
  );
}

export default SignupOrLoginForm;
