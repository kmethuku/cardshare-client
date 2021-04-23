import { useState, useEffect } from 'react';
import NewDeck from './newDeck';

function Create() {
  const [clicked, setClicked] = useState(false);
  const [deleteCount, setDeleteCount] = useState(0);
  const [deckList, setDeckList] = useState([]);
  const URL = 'http://localhost:3001/myDecks';

  useEffect(() => {
    fetch(URL).then(data => data.json()).then(res => setDeckList(res[0].myDecks));
  }, [deleteCount, clicked]);

  function handleClick(e) {
    console.log(e.target.id)
    fetch(`${URL}/${e.target.id}`, {
      method: 'DELETE'
    }).then(data => data.json()).then(res => console.log(res));
    setDeleteCount(deleteCount + 1);
  }

  return (
    <div>
      {clicked ? <NewDeck setClicked={setClicked}></NewDeck> :
      <div>
        <h1>My Decks</h1>
        {deckList.map(deck => deck.src ?
          <div key={deck._id}>
            <img src={deck.src} />
            <button type="button" id={deck._id} onClick={handleClick}>❌</button>
          </div> :
          <div key={deck._id}>
            <div>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>
            <button type="button" id={deck._id} onClick={handleClick}>❌</button>
          </div>)}
        <button type="button" onClick={() => setClicked(true)}>Create a new deck</button>
      </div>}
    </div>
  )
}

export default Create;
