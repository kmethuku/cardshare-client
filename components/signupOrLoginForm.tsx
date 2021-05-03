import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import { Form, Button, Card } from 'react-bootstrap';
import  { signUpService } from '../services/internalApi';

function SignupOrLoginForm() {
  const [label, setLabel] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({username: '', email: '', password: ''});
  const authorized = useContext(AuthContext);
  if (!authorized) return null;
  // const authorized = useAuth();
  // if (!authorized) return null;
  const { signUp, logIn, currentUser, setCurrentUser, setUsername, setEmail } = authorized;
  const [error, setError] = useState('');
  const router = useRouter();
  const userURL:string = 'http://localhost:3001/users';

  async function handleSignUp(e:any):Promise<void> {
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

  async function handleLogIn(e:any):Promise<void>  {
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

  function handleChange(e:any) : void {
    if (e.target.id === 'username') setUserInfo({...userInfo, username: e.target.value})
    else if (e.target.id === 'email') setUserInfo({...userInfo, email: e.target.value})
    else setUserInfo({...userInfo, password: e.target.value})
  }

  return (
    <Card style={{ position: "relative", maxWidth: "400px", top: "-50px" }}>
      <Card.Body>
        <h2 className="text-center mb-4">{label}</h2>
        <Form data-testid="form">
          {error && <p>{error}</p>}
          {label === "Sign Up" && (
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <br />
              <Form.Control
                type="text"
                id="username"
                value={userInfo.username}
                onChange={handleChange}
                placeholder="jack1234"
                required
              />
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <br />
            <Form.Control
              type="email"
              id="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="jack@example.com"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <br />
            <Form.Control
              type="password"
              id="password"
              value={userInfo.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </Form.Group>
          <Button
            name="signup"
            className="w-100"
            type="submit"
            onClick={label === "Sign Up" ? handleSignUp : handleLogIn}
          >
            {label}
          </Button>
        </Form>
        {label === "Sign Up" ? (
          <div
            className="w-100 text-center mt-2"
            onClick={() => setLabel("Log In")}
          >
            Already have an account? Log In
          </div>
        ) : (
          <div
            className="w-100 text-center mt-2"
            onClick={() => setLabel("Sign Up")}
          >
            Don&apos;t have an account? Sign Up
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default SignupOrLoginForm;
