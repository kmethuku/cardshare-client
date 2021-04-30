import React from 'react';
import SignupOrLoginForm from '../components/signupOrLoginForm';
import { Container } from 'react-bootstrap';

const Home: React.FC = () => {
  return (
    <div>
      <Container
        className="d-flex align-items-center
      justify-content-center my-5"
      >
        <div className="w-100 text-center" style={{ maxWidth: "800px" }}>
          <h5 style={{ fontSize: "40px" }}>
            How much do you remember from the books you&apos;ve read?
          </h5>
          <br />
          <h1 style={{ fontSize: "60px", color: "#007bff" }}>
            Welcome to Cardshare
          </h1>
          <br />
          <h4>The flashcard sharing app for lifelong learners</h4>
          <br />
        </div>
      </Container>
      <Container
        className="d-flex align-items-center
      justify-content-center"
        style={containerStyle}
      >
        <div className="w-100 text-center" style={{ maxWidth: "400px" }}>
          <SignupOrLoginForm></SignupOrLoginForm>
        </div>
      </Container>
    </div>
  );
}

const containerStyle = { minHeight: "50vh" }

export default Home;