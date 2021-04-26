import HeaderButtons from '../components/headerButtons';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import Flashcards from '../components/flashcards';

function Study() {
  const { currentUser, email } = useAuth();
  const URL = 'http://localhost:3001/savedDecks';
  const [savedDecks, setSavedDecks] = useState([]);
  const [flashcards, setFlashcards] = useState('');
  const [numDeleted, setNumDeleted] = useState(0);

  useEffect(() => {
    fetch(URL + `/${email}`).then(data => data.json()).then(res => res[0] ? setSavedDecks(res[0].savedDecks) : setSavedDecks(savedDecks));
  }, [numDeleted]);

  function handleDeleteClick(e) {
    fetch(`${URL}/${email}-${e.target.id}`, {
      method: 'DELETE'
    }).then(data => data.json()).then(res => console.log(res));
    setNumDeleted(numDeleted + 1);
  }

  if (currentUser) {
    if (flashcards) {
      return (
        <Flashcards flashcards={flashcards} setFlashcards={setFlashcards}></Flashcards>
      )
    } else return (
      <div>
        <HeaderButtons></HeaderButtons>
        <h1>My Saved Decks</h1>
          {savedDecks.map(deck => deck.src ?
            <div key={deck._id}>
              <img src={deck.src} onClick={() => setFlashcards(deck)}/>
              <button type="button" id={deck._id} onClick={handleDeleteClick}>❌</button>
            </div> :
            <div key={deck._id}>
              <div onClick={() => setFlashcards(deck)}>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>
              <button type="button" id={deck._id} onClick={handleDeleteClick}>❌</button>
            </div>)}
      </div>
    )
  }
  else return <h1>Access Unauthorized</h1>
}

export default Study;
