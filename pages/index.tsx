import React, { useState } from 'react';
import SignupOrLoginForm from '../components/signupOrLoginForm';
import Container from '../components/Container'
import Card from '../components/Card'
import SignUpForm from '../components/SignUpForm'
import LogInForm from '../components/LogInForm'

const Home: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false)
  console.log(login)
  return (
    <div className="grid2">
      <Container>
        <Card>
        <h1>
            Welcome to Cardshare
          </h1>
          <br />
          <h2>
            How much do you remember from the books you&apos;ve read?
          </h2>
          <br />
          <h2>The flashcard sharing app for lifelong learners</h2>
          <br />
        </Card>
      </Container>
      {/* <Container> */}
        <div className="flip-container">
          <div className={"card-container" + (login ? " flipped" : "")}>
          <SignUpForm setLogin={setLogin}/>
          <LogInForm setLogin={setLogin} />
          </div>
        </div>


      {/* </Container> */}
    </div>
  );
}

export default Home;