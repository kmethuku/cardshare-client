import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

function SignupOrLoginForm() {
  const [label, setLabel] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({email: '', password: ''});
  const { signUp, logIn, currentUser } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();
    // TODO: add user info to database
    try {
      setError('');
      await signUp(userInfo.email, userInfo.password);
      router.push('/discover');
    } catch (err) {
      setError('Failed to create an account.');
    }
  }

  async function handleLogIn(e) {
    e.preventDefault();
    // TODO: grab user info from database
    try {
      setError('');
      await logIn(userInfo.email, userInfo.password);
      router.push('/discover');
    } catch (err) {
      setError('Incorrect username or password.');
    }
  }

  function handleChange(e) {
    e.target.type === 'email' ? setUserInfo({...userInfo, email: e.target.value})
      : setUserInfo({...userInfo, password: e.target.value})
  }

  return (
    <div className="SignupOrLoginForm">
      <h3>{label}</h3>
      <form>
        {error && <p>{error}</p>}
        <div>
          <label htmlFor="email">Email</label><br/>
          <input type="email" value={userInfo.email} onChange={handleChange} placeholder="jack@example.com" required/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input type="text" value={userInfo.password} onChange={handleChange} placeholder="********" required/>
        </div>
        <div>
          <input className="button" type="submit" onClick={label === 'Sign Up' ? handleSignUp : handleLogIn} value={label}/>
        </div>
      </form>
      {label === 'Sign Up' ?
      <div>
        <p>Already have an account?</p>
        <a onClick={() => setLabel('Log In')}>Log In</a>
      </div>
      :
      <div>
        <p>Don't have an account?</p>
        <a onClick={() => setLabel('Sign Up')}>Sign Up</a>
      </div>}
    </div>
  )
}

export default SignupOrLoginForm;
