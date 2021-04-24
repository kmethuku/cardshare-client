
function Book({ selectedBook }) {
  return (
    <div>
      <h2>{selectedBook.title}</h2>
      {selectedBook.src ?
        <img src={selectedBook.src} key={selectedBook.key}/> :
        <div key={selectedBook.key}>{selectedBook.title.length > 50 ? selectedBook.title.substring(0, 50) + '...' : selectedBook.title}</div>}
      <h3>Available Decks</h3>
      {/* <p>Deck description</p>
          <p>Creator name</p>
          <div>Upvotes</div>
          <button>View details</button>*/}
    </div>
  )
}

export default Book;
