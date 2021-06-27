import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../../components/searchbar';
import { AuthContext } from '../../contexts/AuthContext';
import { getUserService, newDeckService } from '../../services/internalApi';
import ICard from '../../interfaces/ICard';
import IDeck, { defaultDeck } from '../../interfaces/IDeck';
import FormControlElement from '../../interfaces/FormControlElement';
import HeaderButtons from '../../components/headerButtons';

const NewDeck = () => {
  const context = useContext(AuthContext);
  if (!context) return null;
  const router = useRouter();
  const genreOption:Array<string> =[
    'Self-Growth', 'History'
  ]
  const email = context?.currentUser.email;
  let username = context.username;
  const [newDeck, setNewDeck] = useState<IDeck>(defaultDeck);

  useEffect(() => {
    setNewDeck({...defaultDeck, cards: [{question: '', answer: ''}]});
  }, []);

  const handleDeckChange = (e: React.ChangeEvent<FormControlElement>): void => {
    const { name, value } = e.target;
    setNewDeck({ ...newDeck, [name]: value, });
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
    let cardArray = [...newDeck.cards];
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
      username = await getUserService(email);
    }
    e.preventDefault();
    newDeckService(email, newDeck);
    setNewDeck(defaultDeck);
    router.push('/create');
  }

  return (
    <div>
      <HeaderButtons/>
      <div className="page-container deck-details">
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
          ></input>
          <div className="card-container">
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
                  ></input>
                  <label className="form-container__label" htmlFor="answer">Answer:</label>
                  <input className="form-container__input--blue"
                    type="text"
                    name="answer"
                    value={card.answer}
                    onChange={(e) => handleCardChange(e, index)}
                  ></input>
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
            disabled={!newDeck.title || !newDeck.genre || !newDeck.description || newDeck.cards && !newDeck.cards[0].question || !newDeck.cards[0].answer}
          >
            Save Deck
          </button>
          <button
            type="button"
            onClick={() => router.push('/create')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewDeck;
