import Navbar from '../components/navbar';
import HeaderButtons from '../components/headerButtons';
import { useState } from 'react';
import Book from '../components/book';
import { useAuth } from '../contexts/AuthContext';


function Discover() {
  const [selectedBook, setSelectedBook] = useState('');
  const searchURL = 'http://openlibrary.org/search.json?title='; //URL to server, fetch popular decks
  const { currentUser } = useAuth();

  // function findBook(titleQuery) {
  //   fetch(searchURL + titleQuery).then(data => data.json()).then(res => setResults(res.docs));
  // }

  if (currentUser)
  return (
    <div>
      <HeaderButtons></HeaderButtons>
      <Navbar setSelectedBook={setSelectedBook}></Navbar>
      {selectedBook ? <Book selectedBook={selectedBook}></Book> :
      <div>
        <h2>Discover New Decks</h2>
        <h3>Popular</h3>
        <h3>Business</h3>
        <h3>Philosophy</h3>
        <h3>History</h3>
      </div>
      }
    </div>
  )
  else return <h1>Access Unauthorized</h1>
}

export default Discover;
