import React, { useState, useContext, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import SearchBar from '../../components/searchbar';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserService, newDeckService } from '../../services/internalApi';
import ICard from '../../interfaces/ICard';
import IDeck, { defaultDeck } from '../../interfaces/IDeck';
import FormControlElement from '../../interfaces/FormControlElement';
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';
import { IAuthContext } from '../../interfaces/IAuth';

const NewDeck: React.FC = () => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const router: NextRouter = useRouter();
  const genreOption: Array<string> =[
    'Self-Growth', 'History'
  ]
  let username: string = auth.username;
  const { email, currentUser } = auth;
  const [newDeck, setNewDeck] = useState<IDeck>({ ...defaultDeck, cards: [{ question: '', answer: '' }] });

  useEffect(() => {
    setNewDeck({ ...defaultDeck, cards: [{ question: '', answer: '' }] });
  }, []);

  const handleDeckChange = (e: React.ChangeEvent<FormControlElement>): void => {
    const { name, value } = e.target;
    setNewDeck({ ...newDeck, [name]: value });
  }

  const handleCardChange = (e: React.ChangeEvent<FormControlElement>, index: number): void => {
    const { name, value } = e.target;
    let cardArray = [...newDeck.cards] as any[];
    cardArray[index][name] = value;
    setNewDeck({
      ...newDeck,
      cards: cardArray
    });
  }

  function handleRemoveClick(e: React.MouseEvent<HTMLElement, MouseEvent>, index: number): void {
    let cardArray: ICard[] = [...newDeck.cards];
    cardArray.splice(index, 1);
    setNewDeck({
      ...newDeck,
      cards: cardArray
    });
  }

  function handleAddClick(): void {
    setNewDeck({
      ...newDeck,
      cards: [...newDeck.cards, { question: '', answer: '' }]
    });
  }

  async function handleSubmit (e: React.MouseEvent<HTMLElement, MouseEvent>): Promise<any> {
    if (!username) {
      try {
        username = await getUserService(email || currentUser.email);
      } catch (err) {
        alert('Sorry, an error occurred.');
      }
    }
    e.preventDefault();
    try {
      await newDeckService(email || currentUser.email, newDeck);
    } catch (err) {
      alert('Sorry, an error occurred.');
    }
    setNewDeck({ ...defaultDeck, cards: [{ question: '', answer: '' }] });
    router.push('/create');
  }

  return (
    <div>
      <HeaderButtons/>
      <div className="page-container center-text">
      {currentUser.uid ?
      <div>
        <h2 className="header">New Deck</h2>
        <form className="form-container__form">
          <label className="form-container__label" htmlFor="title">Title:</label>
          <SearchBar setNewDeck={setNewDeck} newDeck={newDeck}/>
          <label className="form-container__label" htmlFor="genre">Genre:</label>
          <input className="form-container__input--yellow-outline" name="genre" list="genres" value={newDeck.genre} onChange={handleDeckChange}/>
          <datalist id="genres">
            {genreOption.map((genre, index) => {
              return <option key={index} value={genre}/>
            })}
          </datalist>
          <label className="form-container__label" htmlFor="description">Description:</label>
          <input className="form-container__input--yellow-outline"
            type="text"
            name="description"
            value={newDeck.description}
            onChange={handleDeckChange}
          />
          <div className="flex-wrap">
            {newDeck.cards.map((card: ICard, index: number) => (
                <div key={index} className="form-container__form--gray">
                  <p className="label">Flashcard {index + 1}:</p>
                  <button type="button" className="round-button" onClick={(e) => handleRemoveClick(e, index)}>x</button>
                  <label className="form-container__label" htmlFor="question">Question:</label>
                  <input className="form-container__input--blue"
                    type="text"
                    name="question"
                    value={card.question}
                    onChange={(e) => handleCardChange(e, index)}
                  />
                  <label className="form-container__label" htmlFor="answer">Answer:</label>
                  <input className="form-container__input--blue"
                    type="text"
                    name="answer"
                    value={card.answer}
                    onChange={(e) => handleCardChange(e, index)}
                  />
                </div>
            ))}
          </div>
          <button
            className="round-button"
            type="button"
            onClick={handleAddClick}
          >
            +
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!newDeck.title || !newDeck.genre || !newDeck.description || !newDeck.cards[0] || newDeck.cards[0] && (!newDeck.cards[0].question || !newDeck.cards[0].answer)}
          >
            Create Deck
          </button>
          <button
            type="button"
            onClick={() => router.push('/create')}
          >
            Cancel
          </button>
        </form>
      </div> :
      <h2 className="header center-text">You are not authorized to access this page. Please <Link href="/">log in</Link>.
      </h2>
      }
      </div>
    </div>
  );
}

export default NewDeck;
