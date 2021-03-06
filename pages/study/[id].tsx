import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import IDeck from '../../interfaces/IDeck';
import ICard from '../../interfaces/ICard';
import { NextRouter, useRouter } from 'next/router';
import { getSavedDeckByIdService } from '../../services/internalApi';
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';
import Loader from '../../components/loader';

const Flashcards: React.FC = () => {
  const { currentUser, email } = useContext(AuthContext);
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [card, setCard] = useState<ICard | undefined>(deck?.cards[0]);
  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const sendEmail: string = currentUser.email || email;
    if (sendEmail) {
      setLoading(true);
      getSavedDeckByIdService(sendEmail, id)
        .then(data => {
          setDeck(data);
          setCard(data.cards[0]);
        })
        .then(() => setLoading(false))
        .catch((err) => {
          setLoading(false);
          alert('Sorry, an error occurred.');
        })
    }
  }, [])

  const handleMove = (increment: number): void => {
    setCard(deck?.cards[index + increment]);
    setIndex(index + increment);
  }

  if (loading) return <Loader/>;
  return deck && (
    <div>
      <HeaderButtons/>
      <div className="page-container center-text">
      {currentUser.uid ?
      <div>
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
            >
              <div className="flashcard-details__card-front">
                <h2>{card?.question}</h2>
              </div>
              <div className="flashcard-details__card-back">
                <h2>{card?.answer}</h2>
              </div>
            </div>
          </div>
          <button
            disabled={index === deck.cards.length - 1}
            className="round-button"
            onClick={() => handleMove(1)}
            type="button"
          >
            <img src="/next.png" width="15" height="auto"/>
          </button>
        </div>
      </div> :
      <h2 className="header center-text">You are not authorized to access this page. Please <Link href="/">log in</Link>.
      </h2>
    }
      </div>
    </div>
  );
}

export default Flashcards;
