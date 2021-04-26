import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

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
      <Link href="/study">
        <button type="button" onClick={() => setFlashcards('')}>Back to Saved Decks</button>
      </Link>
      <div>
        <div onClick={() => toggleCardText(card)}>{cardText}</div>
        <button type="button" onClick={handlePrevClick}>◀</button>
        <button type="button" onClick={handleNextClick}>▶</button>
      </div>
      <p>Created by {flashcards.creator}</p>
    </div>
  )
}

export default Flashcards;
