import SearchBar from '../components/searchbar';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import IBook from '../interfaces/IBook';
import ListBooks from '../components/listBooks';
import HeaderButtons from '../components/headerButtons';

function Discover() {
  const defaultBook = {title: '', src:'', OLID: ''};
  const [selectedBook, setSelectedBook] = useState<IBook>(defaultBook);
  const authorized = useContext(AuthContext);
  if (!authorized) return null;
  const { currentUser } = authorized;

  return (
   <div>
      <HeaderButtons/>
      <div className="page-container">
      {currentUser ? (<>
        <SearchBar setSelectedBook={setSelectedBook}/>
        <ListBooks title="Popular"/>
        <ListBooks title="Self-Growth"/>
        <ListBooks title="History"/>
      </>) : (<div>Access unauthorized.</div>)}
      </div>
  </div>)
}

export default Discover;
