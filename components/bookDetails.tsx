import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

type Props = {
  book:any;
}

const BookDetails: React.FC<Props> = ({ book }) => {
  const router = useRouter();

  useEffect(() => {
    const html = document.getElementById('description');
    const shortDesc = book?.description?.slice(0, 1000) + '...'
    if (html) html.innerHTML = shortDesc;
  }, [book])

  const handleNewDeck = () => {
    router.push('/create/new');
  }

  return (
    <div>
      <div>
        <h2 className="header">{book.title}</h2>
        <button
          type="button"
          onClick={handleNewDeck}> Create New Deck
        </button>
        <div>
          <div className="small-book">
            {book.img && <img
              src={book.img}/>}
          </div>
          <div>
            {book.author && <div>
              <p className="label">Author:</p>
              <p>{book.author}</p>
              </div>}
            {book.publishedDate && <div>
              <p className="label">Date published:</p>
              <p>{book.publishedDate}</p>
              </div>}
            {book.pageCount && <div>
              <p className="label">Page count:</p>
              <p>{book.pageCount}</p>
              </div>}
            {book.averageRating && <div>
              <p className="label">Average rating:</p>
              <p>{book.averageRating} / 5</p>
              </div>}
            {book.description && <div>
              <p className="label">Description:</p>
              <p id="description"></p>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails;
