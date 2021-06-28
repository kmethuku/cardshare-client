import SearchBar from '../components/searchbar';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import IBook from '../interfaces/IBook';
import ListBooks from '../components/listBooks';
import HeaderButtons from '../components/headerButtons';
import Link from 'next/link';

const Discover: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const defaultBook = { title: '', src: '', OLID: '' };
  const [selectedBook, setSelectedBook] = useState<IBook>(defaultBook);
  const { currentUser } = auth;

  return (
   <div>
      <HeaderButtons/>
      <div className="page-container">
        {currentUser.uid ?
        <div>
          <SearchBar setSelectedBook={setSelectedBook}/>
          <ListBooks title="Popular"/>
          <ListBooks title="Self-Growth"/>
          <ListBooks title="History"/>
        </div> :
        <h2 className="header centered-container">You are not authorized to access this page. Please <Link href="/">log in</Link>.
        </h2>}
      </div>
  </div>)
}

export default Discover;
