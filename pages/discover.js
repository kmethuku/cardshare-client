import Navbar from '../components/navbar';
import HeaderButtons from '../components/headerButtons';
import React, { useState, useEffect } from 'react';
import Book from '../components/book';
import { useAuth } from '../contexts/AuthContext';

function Discover() {
  const [selectedBook, setSelectedBook] = useState('');
  const [voted, setVoted] = useState(0);
  const [popular, setPopular] = useState([]);
  const [selfGrowth, setSelfGrowth] = useState([]);
  const [history, setHistory] = useState([]);
  const discoverURL = 'http://localhost:3001/discover';
  const { currentUser } = useAuth();
  const searchURL = 'http://openlibrary.org/search.json?title=';

  useEffect(() => {
    fetch(discoverURL).then(data => data.json()).then(res => {
      let allDecks = [];
      let duplicateCheck = [];
      res.forEach(match => match.myDecks.forEach(deck => {
        if (!duplicateCheck.includes(deck.OLID)) {
          deck.username = match.username;
          allDecks.push(deck);
          duplicateCheck.push(deck.OLID);
        }
      }));
      setPopular(allDecks);
    })
    fetch(discoverURL + `/genre/self-growth`).then(data => data.json()).then(res => {
      let allDecks = [];
      let duplicateCheck = [];
      res.forEach(match => match.myDecks.forEach(deck => {
        if (!duplicateCheck.includes(deck.OLID)) {
          deck.username = match.username;
          allDecks.push(deck);
          duplicateCheck.push(deck.OLID);
        }
      }));
      setSelfGrowth(allDecks);
    })
    fetch(discoverURL + `/genre/history`).then(data => data.json()).then(res => {
      let allDecks = [];
      let duplicateCheck = [];
      res.forEach(match => match.myDecks.forEach(deck => {
        if (!duplicateCheck.includes(deck.OLID)) {
          deck.username = match.username;
          allDecks.push(deck);
          duplicateCheck.push(deck.OLID);
        }
      }));
      setHistory(allDecks);
    })
  }, [voted])

  function handleClick(e) {
    let query = e.target.title.split(' ').join('+');
    fetch(searchURL + query).then(data => data.json()).then(res => {
      let longKey = '/works/' + e.target.id;
      let found = res.docs.find(match => match.key === longKey);
      setSelectedBook({
        title: found.title,
        src: found.cover_i ? `https://covers.openlibrary.org/b/id/${found.cover_i}-M.jpg` : undefined,
        OLID: e.target.id
      });
    });
  }

  return (
    <div>
      {currentUser ?
        <div style={{position:"relative"}}>
          <HeaderButtons></HeaderButtons>
          <div className="mx-2">
            <div style={{position:"relative", zIndex:"2"}}>
              <Navbar setSelectedBook={setSelectedBook}></Navbar>
            </div>
            {selectedBook ? <Book setVoted={setVoted} voted={voted} selectedBook={selectedBook} setSelectedBook={setSelectedBook} ></Book> :
            <div style={{position:"absolute", top:"130px", zIndex:"1"}}>
              <h2 className="mt-4">Discover New Decks</h2>
              <h3 className="mt-4">Popular</h3>
              <div className="d-flex flex-row align-items-center
                justify-content-start mx-2 mt-2">
                {popular.map(deck => {return ((deck.src ?
                  <img src={deck.src} className="mx-3 my-2" width="150px" height="auto" key={deck._id} id={deck.OLID} title={deck.title} onClick={handleClick}/> :
                  <div key={deck._id} className="my-3 mx-2 text-center" style={{ height:"220px", width:"150px", fontSize:"20px",
                  border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem", padding: "2px"}} id={deck.OLID} title={deck.title} onClick={handleClick}>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>))})}
              </div>
              <h3 className="mt-4">Self-Growth</h3>
              <div className="d-flex flex-row align-items-center
                justify-content-start mx-2 mt-2">
                {selfGrowth.map(deck => {return ((deck.src ?
                  <img src={deck.src} className="mx-3 my-2" width="150px" height="auto" key={deck._id} id={deck.OLID} title={deck.title} onClick={handleClick}/> :
                  <div key={deck._id} className="my-3 mx-2 text-center" style={{ display:"inline-block", padding: "2px", height:"220px", width:"150px", fontSize:"20px",
                  border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem"}} id={deck.OLID} title={deck.title} onClick={handleClick}>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>))})}
              </div>
              <h3 className="mt-4">History</h3>
              <div className="d-flex flex-row align-items-center
                justify-content-start mx-2 mt-2">
                {history.map(deck => {return ((deck.src ?
                  <img src={deck.src} className="mx-3 my-2" width="150px" height="auto" key={deck._id} id={deck.OLID} title={deck.title} onClick={handleClick}/> :
                  <div key={deck._id} className="my-3 mx-2 text-center" style={{ height:"220px", width:"150px", fontSize:"20px",
                  border: "1px solid rgba(0,0,0,.125)", borderRadius: ".25rem", padding: "2px"}} id={deck.OLID} title={deck.title} onClick={handleClick}>{deck.title.length > 50 ? deck.title.substring(0, 50) + '...' : deck.title}</div>))})}
            </div>
            </div>
            }
          </div>
        </div> : <h1>Access Unauthorized</h1>}
      </div>
  )
}

export default Discover;
