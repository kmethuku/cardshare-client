import React, { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LogInForm from '../components/LogInForm';

const Home: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="landing-page-container">
      <img src="/cardshare-logo-tight.png" width="250" height="auto"></img>
      {login ? <LogInForm setLogin={setLogin}></LogInForm> : <SignUpForm setLogin={setLogin}></SignUpForm>}
    </div>
  );
}

export default Home;