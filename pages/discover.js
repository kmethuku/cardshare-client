import Navbar from '../components/navbar';
import HeaderButtons from '../components/headerButtons';
import { useState, useEffect } from 'react';
import Book from '../components/book';
import { useAuth } from '../contexts/AuthContext';


function Discover() {
  const [selectedBook, setSelectedBook] = useState('');
  const [popular, setPopular] = useState([]);
  const discoverURL = 'http://localhost:3001/discover';
  const { currentUser } = useAuth();
  const searchURL = 'http://openlibrary.org/search.json?title=';

  useEffect(() => {
    fetch(discoverURL).then(data => data.json()).then(res => {
      let allDecks = [];
      console.log('res',res);
      res.forEach(match => match.myDecks.forEach(deck => {
        deck.username = match.username;
        allDecks.push(deck);
      }));
      console.log('allDecks',allDecks);

      setPopular(allDecks);
    })
  }, [])

  function handleClick(e) {
    console.log('query', query)
    let query = e.target.title.split(' ').join('+');
    fetch(searchURL + query).then(data => data.json()).then(res => {
      console.log('res', res)
      console.log('e.target.id', e.target.id)
      let longKey = '/works/' + e.target.id;
      let found = res.docs.find(match => match.key === longKey);
      console.log('found', found)
      setSelectedBook({
        title: found.title,
        src: `https://covers.openlibrary.org/b/id/${found.cover_i}-M.jpg`,
        OLID: e.target.id
      });
    });
  }

  if (currentUser)
  return (
    <div>
      <HeaderButtons></HeaderButtons>
      <Navbar setSelectedBook={setSelectedBook}></Navbar>
      {selectedBook ? <Book selectedBook={selectedBook} ></Book> :
      <div>
        <h2>Discover New Decks</h2>
        <h3>Popular</h3>
        {popular.map(deck => {return ((deck.src ?
          <img src={deck.src} key={deck._id} id={deck.OLID} title={deck.title} onClick={handleClick}/> :
          <div key={deck._id} id={deck.OLID} title={deck.title} onClick={handleClick}>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>))})}
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
