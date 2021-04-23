import { useState } from 'react';
import Navbar from './navbar';

function NewDeck({ setClicked }) {
  const [deck, setDeck] = useState({ title: '', description: '', src: '' });
  const [cardList, setCardList] = useState([{ question: '', answer: ''}]); // add highlight back
  const URL = 'http://localhost:3001/myDecks';

  function handleChange(e, index) {
    const { name, value } = e.target;
    if (name === 'description') setDeck({...deck, description: value});
    else {
      const tempList = [...cardList];
      tempList[index][name] = name === 'highlight' ? e.target.files[0] : value;
      setCardList(tempList);
    }
  }

  function handleRemoveClick(index) {
    const tempList = [...cardList];
    tempList.splice(index, 1);
    setCardList(tempList);
  };

  function handleAddClick() {
    setCardList([...cardList, { question: '', answer: ''}]); // add highlight back
  };

  function handleSubmit(e) {
    e.preventDefault();
    let tempDeck = deck;
    tempDeck.cards = cardList;
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tempDeck)
    }).then(res => console.log(res));
    setClicked(false);
  };

  return (
    <div>
      <h2>New Deck</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label><br/>
          <Navbar setDeck={setDeck} deck={deck}></Navbar>
        </div>
        <div>
          <label htmlFor="description">Description</label><br/>
          <input type="text" name="description" value={deck.description} onChange={handleChange} placeholder="Enter a short description for your deck"/>
        </div>
        {cardList.map((card, index) => (
        <div key={index}>
          <label htmlFor="question">Question</label><br/>
          <input type="text" name="question" value={card.question} onChange={e => handleChange(e, index)} placeholder="Enter question"/><br/>
          <label htmlFor="answer">Answer</label><br/>
          <input type="text" name="answer" value={card.answer} onChange={e => handleChange(e, index)} placeholder="Enter answer"/><br/>
          {/* <label htmlFor="highlight">Upload Reference Highlight</label><br/> */}
          {/* <input type="file" name="highlight" accept="image/*" onChange={e => handleChange(e, index)}/><br/> */}
          <button type="button" onClick={() => handleRemoveClick(index)}>❌</button>
        </div>))}
        <button type="button" onClick={handleAddClick}>Add Card</button>
        <div>
          <input className="button" type="submit" value="Save"/>
        </div>
      </form>
    </div>
  )
}

export default NewDeck;
