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
import Loader from '../../components/loader';

const NewDeck: React.FC = () => {
  const router: NextRouter = useRouter();
  const { title, src, OLID } = router.query;
  const genreOption: Array<string> = ['Self-Growth', 'History'];
  let username: string = useContext(AuthContext).username;
  const { email, currentUser } = useContext(AuthContext);
  const [newDeck, setNewDeck] = useState<IDeck>({
    ...defaultDeck,
    cards: [{ question: '', answer: '' }]
  });
  const [cardComplete, setCardComplete] = useState<boolean>(false);
  const [renderCount, setRenderCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setNewDeck({
      ...newDeck,
      title: title as string,
      src: src as string,
      OLID: OLID as string
    });
    setRenderCount(renderCount + 1);
  }, [title, src, OLID]);

  const handleDeckChange = (e: React.ChangeEvent<FormControlElement>): void => {
    const { name, value } = e.target;
    setNewDeck({ ...newDeck, [name]: value });
  }

  const handleCardChange = (e: React.ChangeEvent<FormControlElement>, index: number): void => {
    const { name, value } = e.target;

    if (name === 'question')
      (value.length && newDeck.cards[index].answer) ?
        setCardComplete(true) : setCardComplete(false);
    else if (name === 'answer')
      (value.length && newDeck.cards[index].question) ?
        setCardComplete(true) : setCardComplete(false);

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
    e.preventDefault();
    setLoading(true);
    if (!username) {
      try {
        username = await getUserService(email || currentUser.email);
      } catch (err) {
        alert('Sorry, an error occurred.');
      }
    }
    let cleanedCards = newDeck.cards.filter((card) => card.question);
    try {
      await newDeckService(email || currentUser.email, { ...newDeck, cards: cleanedCards });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Sorry, an error occurred.');
    }
    setNewDeck({ ...defaultDeck, cards: [{ question: '', answer: '' }] });
    router.push('/create');
  }

  if (loading) return <Loader/>;
  return (
    <div>
      <HeaderButtons/>
      <div className="page-container center-text">
      {currentUser.uid ?
      <div>
        <h2 className="header">New Deck</h2>
        <form className="form-container__form">
          <label className="form-container__label" htmlFor="title">Title:</label>
          <SearchBar key={renderCount} setNewDeck={setNewDeck} newDeck={newDeck}/>
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
            disabled={!newDeck.title || !newDeck.genre || !newDeck.description || !newDeck.cards[0] || !cardComplete}
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
