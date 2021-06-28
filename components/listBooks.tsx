import React, { useState, useEffect } from 'react';
import { getDecksByGenreService } from '../services/internalApi';
import Link from 'next/link';
import IDeck from '../interfaces/IDeck';

interface Props {
  title: string
}

const ListBooks: React.FC<Props> = ({ title }) => {
  const [bookList, setBookList] = useState<IDeck[]>([]);

  useEffect(() => {
    getDecksByGenreService(title)
      .then((decks) => setBookList(decks));
  }, [])

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
                <p className="label">{book.title.length > 30 ? book.title.substring(0, 30).concat('...') : book.title}</p>
              }
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ListBooks;
