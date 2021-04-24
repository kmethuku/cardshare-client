import HeaderButtons from './headerButtons';

function ViewDeck({ selectedDeck }) {
  return (
    <div>
      <HeaderButtons></HeaderButtons>
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
    </div>
  )
}

export default ViewDeck;
