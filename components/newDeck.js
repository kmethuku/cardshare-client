import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import HeaderButtons from './headerButtons';
import { useAuth } from '../contexts/AuthContext';
import { newDeckService } from '../services/internalApi';
import { Form, Button, Card, Container } from 'react-bootstrap';

const NewDeck = ({ setClickedItem }) => {
  const [newDeck, setNewDeck] = useState({ title: '', description: '', src: '', genre: '', OLID: '' });
  const [cardList, setCardList] = useState([{ question: '', answer: ''}]); // add highlight back
  // const URL = 'http://localhost:3001/myDecks';
  const { currentUser, username, email } = useAuth();

  function handleChange(e, index) {
    const { name, value } = e.target;
    if (name === 'description') setNewDeck({...newDeck, description: value});
    else if (name === 'genre') setNewDeck({...newDeck, genre: value});
    else {
      const tempList = [...cardList];
      tempList[index][name] = name === 'highlight' ? e.target.files[0] : value;
      setCardList(tempList);
    }
  }

  function handleRemoveClick(index) {
    const tempList = [...cardList];
    tempList.splice(index, 1);
    setCardList(tempList);
  }

  function handleAddClick() {
    setCardList([...cardList, { question: '', answer: ''}]); // add highlight back
  }

  function handleSubmit(e) {
    let tempNewDeck = newDeck;
    tempNewDeck.genre = tempNewDeck.genre.toLowerCase();
    tempNewDeck.cards = cardList;
    tempNewDeck.creator = username;
    newDeckService(email, tempNewDeck)
    // fetch(URL + '/' + email, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Origin': 'http://localhost:3000'
    //   },
    //   body: JSON.stringify(tempNewDeck)
    // }).then(data => data.json());
    setClickedItem('');
  }

  return (
    <div style={{ position: "relative" }}>
      <HeaderButtons></HeaderButtons>
      <h1 className="text-center my-4">New Deck</h1>
      <Container
        className="d-flex align-items-center
        justify-content-center text-center mt-4"
      >
        <Card style={{ width: "400px" }}>
          <Card.Body>
            <Form.Group>
              <Form.Label htmlFor="title">Title</Form.Label>
              <br />
              <div style={{ position: "relative", zIndex: "2" }}>
                <Navbar setNewDeck={setNewDeck} newDeck={newDeck}></Navbar>
              </div>
            </Form.Group>
            <div
              style={{
                position: "absolute",
                top: "130px",
                left: "0px",
                zIndex: "1",
                width: "400px",
                border: "1px solid rgba(0,0,0,.125)",
                borderRadius: ".25rem",
                padding: "20px",
                borderTop: "none",
              }}
            >
              <Form.Group className="my-3">
                <Form.Label htmlFor="genre">Genre</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="genre"
                  value={newDeck.genre}
                  onChange={handleChange}
                  placeholder="Enter the genre of the book"
                />
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="description"
                  value={newDeck.description}
                  onChange={handleChange}
                  placeholder="Enter a description of your deck"
                />
              </Form.Group>
              {cardList.map((card, index) => (
                <Form.Group className="my-3" key={index}>
                  <Form.Label htmlFor="question">Question</Form.Label>
                  <Form.Control
                    type="text"
                    name="question"
                    value={card.question}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Enter question"
                  />
                  <Form.Label htmlFor="answer">Answer</Form.Label>
                  <Form.Control
                    type="text"
                    name="answer"
                    value={card.answer}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Enter answer"
                  />
                  {/* <label htmlFor="highlight">Upload Reference Highlight</label><br/> */}
                  {/* <input type="file" name="highlight" accept="image/*" onChange={e => handleChange(e, index)}/><br/> */}
                  <Button
                    type="button"
                    className="mt-3"
                    onClick={() => handleRemoveClick(index)}
                  >
                    ❌
                  </Button>
                </Form.Group>
              ))}
              <Button type="button" onClick={handleAddClick}>
                Add Card
              </Button>
              <br />
              <Button
                type="button"
                className="w-100 mt-3"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                type="button"
                className="w-100 mt-3"
                onClick={() => setClickedItem("")}
              >
                Cancel
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

NewDeck.propTypes = {
  setClickedItem: PropTypes.func,
}

export default NewDeck;
