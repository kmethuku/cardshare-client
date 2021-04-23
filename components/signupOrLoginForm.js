import { useState } from 'react';
import Link from 'next/link';

function SignupOrLoginForm() {
  const [label, setLabel] = useState('Sign Up');
  const [userInfo, setUserInfo] = useState({email: '', username: '', password: ''});

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: add user info to database
    setUserInfo({email: '', username: '', password: ''});
  }

  function handleChange(e) {
    // TODO: update value depending on field changed ex. setUserInfo({...userInfo, email: e.target.value});
  }

  return (
    <div className="SignupOrLoginForm">
      <h3>{label}</h3>
      <form onSubmit={handleSubmit}>
        {label === 'Sign Up' &&
        <div>
          <label htmlFor="email">Email</label><br/>
          <input type="email" value={userInfo.email} onChange={handleChange} placeholder="jack@example.com"/>
        </div>}
        <div>
          <label htmlFor="username">Username</label><br/>
          <input type="text" value={userInfo.username} onChange={handleChange} placeholder="jackLikesToLearn123"/>
        </div>
        <div>
          <label htmlFor="password">Password</label><br/>
          <input type="text" value={userInfo.password} onChange={handleChange} placeholder="********"/>
        </div>
        <div>
          <Link href="/dashboard">
            <input className="button" type="submit" value={label}/>
          </Link>
        </div>
      </form>
      {label === 'Sign Up' ?
      <div>
        <p>Already have an account?</p>
        <button onClick={() => setLabel('Log In')}>Log In</button>
      </div>
      :
      <div>
        <p>Don't have an account?</p>
        <button onClick={() => setLabel('Sign Up')}>Sign Up</button>
      </div>}
    </div>
  )
}

export default SignupOrLoginForm;
