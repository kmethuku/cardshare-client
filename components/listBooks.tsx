import React, { useState, useEffect } from 'react';
import { getDecksByGenreService } from '../services/internalApi';
import Link from 'next/link';
import IDeck from '../interfaces/IDeck';
import Loader from './loader';

interface Props {
  title: string
}

const ListBooks: React.FC<Props> = ({ title }) => {
  const [bookList, setBookList] = useState<IDeck[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getDecksByGenreService(title)
      .then((decks) => setBookList(decks))
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        alert('Sorry, an error occurred.');
      });
  }, [])

  if (loading) return <Loader/>;
  return (
    <div>
      <h2 className="header">{title}</h2>
      <div className="scroll">
      {bookList &&
        bookList.map((book: IDeck) => (
          <Link key={`${title}${book._id}`} href={`/book/${book.OLID}`}>
            <div className="small-book">
              {book.src ? <img
                src={book.src}/> :
                <p className="bold-text">{book.title.length > 30 ? book.title.substring(0, 30).concat('...') : book.title}</p>
              }
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListBooks;
