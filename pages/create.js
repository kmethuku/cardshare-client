import { useState, useEffect } from 'react';
import HeaderButtons from '../components/headerButtons';
import ViewDeck from '../components/viewDeck';
import NewDeck from '../components/newDeck';
import { useAuth } from '../contexts/AuthContext';

function Create() {
  const [deleteCount, setDeleteCount] = useState(0);
  const [deckList, setDeckList] = useState([]);
  const [clickedItem, setClickedItem] = useState('');
  const [selectedDeck, setSelectedDeck] = useState('');
  const URL = 'http://localhost:3001/myDecks';
  const { currentUser } = useAuth();

  useEffect(() => {
    fetch(URL).then(data => data.json()).then(res => setDeckList(res[0].myDecks));
  }, [deleteCount, clickedItem]);

  function handleDeleteClick(e) {
    console.log(e.target.id)
    fetch(`${URL}/${e.target.id}`, {
      method: 'DELETE'
    }).then(data => data.json()).then(res => console.log(res));
    setDeleteCount(deleteCount + 1);
  }

  if (currentUser) {
    if (clickedItem === 'viewDeck') {
      return (
        <ViewDeck selectedDeck={selectedDeck}></ViewDeck>
      )
    }
    else if (clickedItem === 'createDeck') {
      return (
        <NewDeck setClickedItem={setClickedItem}></NewDeck>
      )
    }
    else return (
      <div>
        <HeaderButtons></HeaderButtons>
        <h1>My Decks</h1>
        {deckList.map(deck => deck.src ?
          <div key={deck._id}>
            <img src={deck.src} onClick={() => { setClickedItem('viewDeck'); setSelectedDeck(deck) }}/>
            <button type="button" id={deck._id} onClick={handleDeleteClick}>❌</button>
          </div> :
          <div key={deck._id}>
            <div onClick={() => { setClickedItem('viewDeck'); setSelectedDeck(deck) }}>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>
            <button type="button" id={deck._id} onClick={handleDeleteClick}>❌</button>
          </div>)}
        <button type="button" onClick={() => setClickedItem('createDeck')}>Create a New Deck</button>
      </div>
    )
  }
  else return <h1>Access Unauthorized</h1>
}

export default Create;
