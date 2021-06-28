import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import BookDetails from '../../components/bookDetails';
import ListDecks from '../../components/listDecks';
import { getBookDetailsService } from '../../services/externalApi';
import { discoverBookService } from '../../services/internalApi';
import HeaderButtons from '../../components/headerButtons';
import { AuthContext } from '../../contexts/AuthContext';
import IBook from '../../interfaces/IBook';
import IDeck from '../../interfaces/IDeck';
import Link from 'next/link';

const BookById: React.FC = () => {
  const auth = useContext(AuthContext);
  if (!auth) return null;
  const { currentUser } = auth;
  const router = useRouter();
  const { id } = router.query;
  const defaultBook = { title: '', src: '', OLID: '' };
  const [book, setBook] = useState<IBook>(defaultBook);
  const [decks, setDecks] = useState<IDeck[]>([]);

  useEffect(() => {
    if (id) {
      const queryId = id.toString();
      getBookDetailsService(queryId)
        .then((bookResult) => setBook(bookResult));
      discoverBookService(queryId)
        .then((deckResult) => setDecks(deckResult));
    }
  }, [id])

  return (
    <div>
      <HeaderButtons/>
      {currentUser.uid ?
      <div className="page-container book-details">
        <BookDetails book={book}/>
        <div>
          <p className="label">Available decks:</p>
          {decks && decks.length ? <ListDecks decks={decks} setDecks={setDecks} type="byBook"/>
          : <p>None yet! Check back later or create one yourself.</p>}
        </div>
      </div> :
      <h2 className="header centered-container">You are not authorized to access this page. Please <Link href="/">log in</Link>.
      </h2>}
    </div>
  )
}

export default BookById;
