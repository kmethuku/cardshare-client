import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import Navbar from './navbar';
import HeaderButtons from './headerButtons';
import { useAuth, AuthContext } from '../contexts/AuthContext';
import { newDeckService } from '../services/internalApi';
import { Form, Button, Card, Container } from 'react-bootstrap';

type Props = {
  setClickedItem: Dispatch<SetStateAction<any>>
}

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const NewDeck = ({ setClickedItem }: Props) => {
  type List = { question: string, answer: string }
  const defaultList = { question: '', answer: '' }
  const defaultDeck = {
    title: '',
    description: '',
    src: '',
    genre: '',
    OLID: '',
    cards: [defaultList],
    creator: '',
  }

  const context = useContext(AuthContext)
  const email = context.currentUser.email;

  const [newDeck, setNewDeck] = useState(defaultDeck);
  const [cardList, setCardList] = useState<List[]>([defaultList]); // add highlight back
  // const URL = 'http://localhost:3001/myDecks';
  const { currentUser, username } = useAuth();

  function handleChange (e: React.ChangeEvent<FormControlElement>, index?: number): void {
    const { name, value } = e.target;
    if (name === 'description') setNewDeck({...newDeck, description: value});
    else if (name === 'genre') setNewDeck({...newDeck, genre: value});
    else if (index !== undefined) {
      const tempList: any[] = [...cardList]
      tempList[index][name] = value;
      setCardList(tempList);
    }
    // else if (files && index !== undefined) {
    //   const tempList: any[] = [...cardList];
    //   tempList[index][name] = name === 'highlight' ? files[0] : value;
    //   setCardList(tempList);
    // }
  }

  function handleRemoveClick(index: number) {
    const tempList = [...cardList];
    tempList.splice(index, 1);
    setCardList(tempList);
  }

  function handleAddClick() {
    setCardList([...cardList, { question: '', answer: ''}]); // add highlight back
  }

  async function handleSubmit (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> {
    e.preventDefault();
    let tempNewDeck = newDeck;
    tempNewDeck.genre = tempNewDeck.genre.toLowerCase();
    tempNewDeck.cards = cardList;
    tempNewDeck.creator = username;
    console.log(email)
    newDeckService(email, tempNewDeck)
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
              <div style={{ position: "relative", zIndex: 2 }}>
                <Navbar setNewDeck={setNewDeck} newDeck={newDeck}></Navbar>
              </div>
            </Form.Group>
            <div
              style={{
                position: "absolute",
                top: "130px",
                left: "0px",
                zIndex: 1,
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
                  onChange={(e) => handleChange(e)}
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
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter a description of your deck"
                />
              </Form.Group>
              {cardList.map((card, index) => (
                <Form.Group className="my-3" key={index}>
                  {console.log(index)}
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
              <Button type="button" onClick={() => handleAddClick()}>
                Add Card
              </Button>
              <br />
              <Button
                type="button"
                className="w-100 mt-3"
                onClick={(e) => handleSubmit(e)}
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

export default NewDeck;
