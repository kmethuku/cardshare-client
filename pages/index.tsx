import React, { useState } from 'react';
import Container from '../components/Container'
import Card from '../components/Card'
import SignUpForm from '../components/SignUpForm'
import LogInForm from '../components/LogInForm'

const Home: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false)
  return (
    <div className="">
      <img src="/cardshare-logo-tight.png" width="250" height="auto"></img>
      {login ? <LogInForm setLogin={setLogin}></LogInForm> : <SignUpForm setLogin={setLogin}></SignUpForm>}
    </div>
  );
}

export default Home;