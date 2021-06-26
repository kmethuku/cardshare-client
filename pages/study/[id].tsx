import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import IDeck from '../../interfaces/IDeck';
import { useRouter } from 'next/router';
import{ getSavedDeckByIdService } from '../../services/internalApi';
import HeaderButtons from '../../components/headerButtons';

function Flashcards () {
  const context = useContext(AuthContext);
  if (!context || !context.currentUser.email) return null;
  const { currentUser, email } = context;
  const router = useRouter();
  const { id } = router.query;
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [cardText, setCardText] = useState<any>(deck?.cards[0]?.question);
  const [textType, setTextType] = useState<string>('Question:');
  const[card, setCard] = useState<any>(deck?.cards[0]);
  const [index, setIndex] = useState<number>(0);
  const [front, setFront] = useState(true);

  useEffect(() => {
    const sendEmail = currentUser.email || email;
    if (sendEmail) {
      getSavedDeckByIdService(sendEmail, id)
      .then(data => {
        setDeck(data);
        setCardText(data.cards[0].question);
        setCard(data.cards[0]);
      })
    }
  }, [])

  const handleMove = (increment:number) : void => {
    setFront(true);
    setTextType('Question:');
    setCard(deck?.cards[index + increment]);
    setCardText(deck?.cards[index + increment].question);
    setIndex(index + increment);
  }

  return deck && card ? (
    <div>
      <HeaderButtons/>
      <div className="page-container flashcard-details">
        <h2 className="header">{deck.title}</h2>
        <p className="label">Created by:</p>
        <div>{deck.creator}</div>
        <div className="flashcard-details__card-container">
          <button
            disabled={index === 0}
            className="round-button"
            onClick={() => handleMove(-1)}
            type="button"
          >
            <img src="/previous.png" width="15" height="auto"></img>
          </button>
          <div className="flashcard-details__card-outer">
            <div
              className="flashcard-details__card-inner"
              onClick={() => setFront(!front)}
            >
              <div className="flashcard-details__card-front">
                <h2 className="header">{card.question}</h2>
              </div>
              <div className="flashcard-details__card-back">
                <h2 className="header">{card.answer}</h2>
              </div>
            </div>
          </div>
          <button
            disabled={index === deck.cards.length - 1}
            className="round-button"
            onClick={() => handleMove(1)}
            type="button"
          >
            <img src="/next.png" width="15" height="auto"></img>
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default Flashcards;