import { useState, useEffect } from 'react';
import ViewDeck from './viewDeck';

function Book({ selectedBook }) {
  const [decks, setDecks] = useState('');
  const [selectedDeck, setSelectedDeck] = useState('');
  const discoverURL = 'http://localhost:3001/discover/OLID';

  useEffect (() => {
    console.log('1', selectedBook.OLID)
    fetch(discoverURL + `/${selectedBook.OLID}`).then(data => data.json()).then(res => {
      console.log('2')

      let allDecks = [];
      res.forEach(match => match.myDecks.forEach(deck => {
        console.log('deck',deck)
        // deck.username = match.username;
        allDecks.push(deck);
      }));
      setDecks(allDecks);
    })
  }, [selectedBook])

  if (selectedDeck.creator) return <ViewDeck selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} from={'book'}></ViewDeck>
  else return (
    <div>
      <h2>{selectedBook.title}</h2>
      {selectedBook.src ?
        <img src={selectedBook.src} key={selectedBook._id}/> :
        <div key={selectedBook._id}>{selectedBook.title.length > 50 ? selectedBook.title.substring(0, 50) + '...' : selectedBook.title}</div>}
      {decks ? <h3>Available Decks</h3> : <h3>No Decks Available</h3>}
      {decks && decks.map(deck =>
        <div>
         <p>{deck.description}</p>
         <p>{deck.creator}</p>
         <div>{deck.votes}</div>
         <button onClick={() => setSelectedDeck(deck)}>View Details</button>
       </div>)}
    </div>
  )
}

export default Book;
