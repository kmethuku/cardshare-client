import HeaderButtons from './headerButtons';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';

function ViewDeck({ selectedDeck, setSelectedDeck, from, setClickedItem, setVoted, voted }) {
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
    }).then(data => data.json());
    setVoted(voted + 1);
    router.push('/study');
  }

  function handleVote(direction) {
    fetch(voteURL + '/' + selectedDeck._id + '-' + direction, {
      method: 'POST'
    }).then(data => data.json());
    fetch(getDeckURL + `/${selectedDeck._id}`).then(data => data.json()).then(res => {
      res[0].myDecks[0].username = res[0].username;
      setSelectedDeck(res[0].myDecks[0]);
    });
    setVoted(voted + 1);
  }

  return (
    <div>
      {from !== 'book' && <HeaderButtons></HeaderButtons>}
      <div style={{position:"absolute", top:"130px", zIndex:"1"}}>
        {from === 'myDeck' ? <Button style={{position:"absolute", zIndex:"2"}} className="mx-2 my-4" onClick={() => setClickedItem('')}>Back</Button> :
          <Button style={{position:"absolute", zIndex:"2"}} className="mx-2 my-4" onClick={() => setSelectedDeck('')}>Back</Button>}
        <div className="d-flex flex-column align-items-center
          justify-content-between" style={{width:"99vw", position:"absolute", top:"0vh"}}>
          <h2 className="mx-2 my-4 text-center">{selectedDeck.title}</h2>
          {selectedDeck.src ?
          <img className="mx-2 my-2" src={selectedDeck.src} key={selectedDeck._id}/> :
          <div className="my-2 mx-2 text-center" style={{ height:"270px", width:"180px", fontSize:"20px",
          border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem", padding: "2px" }} key={selectedDeck._id}>{selectedDeck.title.length > 50 ? selectedDeck.title.substring(0, 50) + '...' : selectedDeck.title}</div>}
          <h4 className="mx-2 my-4">Description: {selectedDeck.description}</h4>
        </div>
        <div className="d-flex flex-row align-items-center
          justify-content-center flex-wrap" style={{width:"99vw", position:"absolute", top:"52vh"}}>
          {selectedDeck.cards.map(card =>
          <Card style={{ maxWidth:"200px" }} className="mx-2 my-2">
            <Card.Body className="text-center">
              <div className="mx-2 my-2">Question: {card.question}</div>
              <div className="mx-2 my-2">Answer: {card.answer}</div>
            </Card.Body>
          {/* <div>{card.highlight}</div> */}
          </Card>)}
        </div>
        <div className="d-flex flex-row align-items-center
          justify-content-center" style={{width:"99vw", position:"absolute", top:"67vh"}}>
          {from !== 'myDeck' ? <Button type="button" onClick={() => handleVote('down')}>👎</Button> : <Button type="button" disabled onClick={() => handleVote('down')}>👎</Button>}
          <p className="mx-2 my-2">{selectedDeck.votes}</p>
          {from !== 'myDeck' ? <Button type="button" onClick={() => handleVote('up')}>👍</Button> : <Button type="button" disabled onClick={() => handleVote('up')}>👍</Button>}
        </div>
        <div className="d-flex flex-column align-items-center
          justify-content-center" style={{width:"99vw", position:"absolute", top:"70vh"}}>
          <p className="mx-2 my-3">Creator: {selectedDeck.creator}</p>
          <Button type="button" onClick={handleClick}>Save Deck</Button>
        </div>
      </div>
    </div>
  )
}

export default ViewDeck;
