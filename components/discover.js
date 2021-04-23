import { useState } from 'react';
import Navbar from './navbar';
import Book from './book';

function Discover() {
  const [book, setBook] = useState('');
  const searchURL = 'http://openlibrary.org/search.json?title=';

  // function findBook(titleQuery) {
  //   fetch(searchURL + titleQuery).then(data => data.json()).then(res => setResults(res.docs));
  // }

  function display() {
    if (book.title) return <Book book={book}></Book>
    else return (
      <div>
        <h2>Discover New Decks</h2>
        <h3>Popular</h3>
        <h3>Business</h3>
        <h3>Philosophy</h3>
        <h3>History</h3>
      </div>)
  }

  return (
    <div>
      <Navbar setBook={setBook}></Navbar>
      {display()}
    </div>
  )
}

export default Discover;
