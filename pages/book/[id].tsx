import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BookDetails from '../../components/bookDetails'
import ListDecks from '../../components/listDecks'
import { getBookDetailsService } from '../../services/externalApi'
import { discoverBookService } from '../../services/internalApi'
import HeaderButtons from '../../components/headerButtons';

const BookDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<any>(null);
  const [decks, setDecks] = useState<any>(null);

  useEffect(() => {
    const getBookDetails = async () => {
      if (id) {
        const queryId = id.toString();
        let bookResult = await getBookDetailsService(queryId);
        setBook(bookResult)

        const deckResult = await discoverBookService(queryId);
        setDecks(deckResult);
        console.log(deckResult)
      }
    }
    getBookDetails();

  },[id])

  return (book &&
    <div>
      <HeaderButtons/>
      <div className="page-container">
        <BookDetails book={book} />
        <p className="book-details book-description-label">Available decks: </p>
        {decks && <ListDecks decks={decks} setDecks={setDecks} type="byBook" />}
      </div>
    </div>
  )
}

export default BookDetailPage
