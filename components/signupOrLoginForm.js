import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

function SignupOrLoginForm() {
  const [label, setLabel] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({username: '', email: '', password: ''});
  const { signUp, logIn, currentUser, setCurrentUser, setUsername, setEmail } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const userURL = 'http://localhost:3001/users';

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      setError('');
      await signUp(userInfo.email, userInfo.password);
      console.log('currentUser', currentUser)
      fetch(userURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: userInfo.username, email: userInfo.email})
      }).then(res => console.log(res));
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      router.push('/discover');
    } catch (err) {
      setError('Failed to create an account.');
      console.log('err', err)
    }
  }

  async function handleLogIn(e) {
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

  function handleChange(e) {
    if (e.target.id === 'username') setUserInfo({...userInfo, username: e.target.value})
    else if (e.target.id === 'email') setUserInfo({...userInfo, email: e.target.value})
    else setUserInfo({...userInfo, password: e.target.value})
  }

  return (
    <div className="SignupOrLoginForm">
      <h3>{label}</h3>
      <form>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="username">Username</label><br/>
          <input type="text" id="username" value={userInfo.username} onChange={handleChange} placeholder="jack1234" required/>
        </div>
        <div>
          <label htmlFor="email">Email</label><br/>
          <input type="email" id="email" value={userInfo.email} onChange={handleChange} placeholder="jack@example.com" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input type="text" id="password" value={userInfo.password} onChange={handleChange} placeholder="********" required/>
        </div>
        <div>
          <input className="button" type="submit" onClick={label === 'Sign Up' ? handleSignUp : handleLogIn} value={label}/>
        </div>
      </form>
      {label === 'Sign Up' ?
        <button type="button" onClick={() => setLabel('Log In')}>Already have an account? Log In</button>
        : <button type="button" onClick={() => setLabel('Sign Up')}>Don't have an account? Sign Up</button>}
    </div>
  )
}

export default SignupOrLoginForm;
