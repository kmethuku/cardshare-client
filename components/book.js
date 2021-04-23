

function Book({ book }) {
  return (
    <div>
      <h2>{book.title}</h2>
      {book.src ?
      <img src={book.src} key={book.key}/> :
      <div key={book.key}>{book.title.length > 50 ? book.title.substring(0, 50) + '...' : book.title}</div>}
      <h3>Available Decks</h3>
      {/* <p>Deck description</p>
          <p>Creator name</p>
          <div>Upvotes</div>
          <button>View details</button>*/}
    </div>
  )
}

export default Book;
