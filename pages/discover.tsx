import Searchbar from '../components/searchbar';
import React, { useState, useEffect, useContext } from 'react';
import Book from '../components/book';
import { useAuth, AuthContext } from '../contexts/AuthContext';
import { getDecksByGenreService } from '../services/internalApi';
import { discoverySearchingService, searchBookService } from '../services/externalApi';
import IBook from '../interfaces/IBook'
import IDeck from '../interfaces/IDeck'
import Container from '../components/Container'
import ListBooks from '../components/listBooks'

function Discover() {
  const defaultBook = {title: '', src:'', OLID: ''}
  const [selectedBook, setSelectedBook] = useState<IBook>(defaultBook);
  const [voted, setVoted] = useState<number>(0);
  const [popular, setPopular] = useState<IDeck[]>([]);
  const [selfGrowth, setSelfGrowth] = useState<IDeck[]>([]);
  const [history, setHistory] = useState<IDeck[]>([]);
  const authorized = useContext(AuthContext)
  if (!authorized) return null;
  const { currentUser } = authorized;



  async function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLImageElement;
    if (target.title) {
      let query = target.title.split(" ").join("+");
      let searchResult = await discoverySearchingService(query, target.id);
      setSelectedBook(searchResult)
    }
  }



  return (
   <Container>
      {currentUser ? (<>
        <h3>Discover Popular Flashcard Decks</h3>
        <Searchbar setSelectedBook={setSelectedBook} />
        <ListBooks title="Popular" />
        <ListBooks title="Self-Growth" />
        <ListBooks title="History"  />
      </>) : (<div>Access unauthorized.</div>)}
  </Container>)

}

export default Discover;
