import HeaderButtons from './headerButtons';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

function ViewDeck({ selectedDeck, setSelectedDeck, from }) {
  const saveURL = 'http://localhost:3001/savedDecks';
  const voteURL = 'http://localhost:3001/discover/vote';
  const getDeckURL = 'http://localhost:3001/discover';
  const { currentUser, email } = useAuth();
  const router = useRouter();

  function handleClick() {
    fetch(saveURL + '/' + email, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedDeck)
    }).then(res => console.log(res));
    router.push('/study');
  }

  function handleVote(direction) {
    fetch(voteURL + '/' + selectedDeck._id + '-' + direction, {
      method: 'POST'
    }).then(res => console.log('first res',res));
    fetch(getDeckURL + `/${selectedDeck._id}`).then(data => data.json()).then(res => {
      console.log('res', res)
      res[0].myDecks[0].username = res[0].username;
      setSelectedDeck(res[0].myDecks[0]);
    });
  }

  return (
    <div>
      {from !== 'book' && <HeaderButtons></HeaderButtons>}
      <h2>{selectedDeck.title}</h2>
      {selectedDeck.src ?
      <img src={selectedDeck.src} key={selectedDeck._id}/> :
      <div key={selectedDeck._id}>{selectedDeck.title.length > 50 ? selectedDeck.title.substring(0, 50) + '...' : selectedDeck.title}</div>}
      <h3>{selectedDeck.description}</h3>
      {selectedDeck.cards.map(card =>
      <div>
        <div>{card.question}</div>
        <div>{card.answer}</div>
      {/* <div>{card.highlight}</div> */}
      </div>)}
      {from !== 'myDeck' ? <button type="button" onClick={() => handleVote('up')}>👍</button> : <button type="button" disabled onClick={() => handleVote('up')}>👍</button>}
      <p>{selectedDeck.votes}</p>
      {from !== 'myDeck' ? <button type="button" onClick={() => handleVote('down')}>👎</button> : <button type="button" disabled onClick={() => handleVote('down')}>👎</button>}
      <p>Created by {selectedDeck.creator}</p>
      <button type="button" onClick={handleClick}>Save Deck</button>
    </div>
  )
}

export default ViewDeck;
