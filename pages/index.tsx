import React, { useState } from 'react';
import SignUpForm from '../components/signUpForm';
import LogInForm from '../components/logInForm';

const Home: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);

  return (
    <div className="flex-column">
      <img src="/cardshare-logo-transparent.png" width="250" height="auto"></img>
      {login ? <LogInForm setLogin={setLogin}/> : <SignUpForm setLogin={setLogin}/>}
    </div>
  );
}

export default Home;