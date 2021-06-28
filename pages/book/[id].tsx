import React, { useEffect, useState, useContext } from 'react';
import { NextRouter, useRouter } from 'next/router';
import BookDetails from '../../components/bookDetails';
import ListDecks from '../../components/listDecks';
import { getBookDetailsService } from '../../services/externalApi';
import { discoverBookService } from '../../services/internalApi';
import HeaderButtons from '../../components/headerButtons';
import { AuthContext } from '../../contexts/AuthContext';
import IBook from '../../interfaces/IBook';
import IDeck from '../../interfaces/IDeck';
import Link from 'next/link';
import { IAuthContext } from '../../interfaces/IAuth';

const BookById: React.FC = () => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const { currentUser } = auth;
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const defaultBook: IBook = { title: '', src: '', OLID: '' };
  const [book, setBook] = useState<IBook>(defaultBook);
  const [decks, setDecks] = useState<IDeck[]>([]);

  useEffect(() => {
    if (id) {
      const queryId: string = id.toString();
      getBookDetailsService(queryId)
        .then((bookResult) => setBook(bookResult))
        .catch((err) => alert('Sorry, an error occurred.'));
      discoverBookService(queryId)
        .then((deckResult) => setDecks(deckResult))
        .catch((err) => alert('Sorry, an error occurred.'));
    }
  }, [id])

  return (
    <div>
      <HeaderButtons/>
      {currentUser.uid ?
      <div className="page-container center-text">
        <BookDetails book={book}/>
        <div>
          <p className="label">Available decks:</p>
          {decks && decks.length ? <ListDecks decks={decks} setDecks={setDecks} type="byBook"/>
          : <p>None yet! Check back later or create one yourself.</p>}
        </div>
      </div> :
      <h2 className="header center-text">You are not authorized to access this page. Please <Link href="/">log in</Link>.
      </h2>}
    </div>
  )
}

export default BookById;
