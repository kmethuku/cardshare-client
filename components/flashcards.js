import HeaderButtons from './headerButtons';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card } from 'react-bootstrap';

function Flashcards({ flashcards, setFlashcards }) {
  const [cardText, setCardText] = useState('');
  const [card, setCard] = useState(flashcards[0]);
  const [index, setIndex] = useState(0);
  const { currentUser } = useAuth();

  useEffect(() => {
    setCardText(flashcards.cards[index].question);
    setCard(flashcards.cards[index]);
  }, [card])

  function toggleCardText(card) {
    if (cardText === card.question)
      setCardText(card.answer);
    else setCardText(card.question);
  }

  function handleNextClick() {
    if (flashcards.cards[index+1] !== undefined) {
      setCard(flashcards.cards[index+1]);
      setIndex(index+1);
    }
  }

  function handlePrevClick() {
    if (flashcards.cards[index-1] !== undefined) {
      setCard(flashcards.cards[index-1]);
      setIndex(index-1);
    }
  }

  return (
    <div>
      <HeaderButtons></HeaderButtons>
      <Link href="/study">
        <Button className="mx-2 my-4" type="button" onClick={() => setFlashcards('')}>Back</Button>
      </Link>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <Card style={{ width:"700px", height: "400px" }}>
          <Card.Body className="d-flex flex-column align-items-center justify-content-center">
            <h1 onClick={() => toggleCardText(card)}>{cardText}</h1>
          </Card.Body>
        </Card>
        <div className="d-flex flex-row align-items-center justify-content-center">
          <Button className="mx-2 mt-4" type="button" onClick={handlePrevClick}>Prev</Button>
          <Button className="mx-2 mt-4" type="button" onClick={handleNextClick}>Next</Button>
        </div>
        <p className="mx-2 my-4">Created by {flashcards.creator}</p>
      </div>
    </div>
  )
}

export default Flashcards;
