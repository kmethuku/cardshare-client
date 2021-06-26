import React, { useEffect } from 'react'
import Container from './Container'
import { useRouter } from 'next/router';

type Props = {
  book:any;
}

const BookDetails = ({book}:Props) => {
  const router = useRouter();

  useEffect(() => {
    const html = document.getElementById('description')
    const shortDesc = book?.description?.slice(0, 1000) + "..."
    if (html) html.innerHTML = shortDesc;
  },[book])

  const handleNewDeck = () => {
    router.push("/create")
  }

  return (
    <div>
      <div className="book-details">
        <h2>{book.title}</h2>
        <button
          type="button"
          className="buttonNewDeck"
          onClick={handleNewDeck}> Create New Deck
        </button>
        <div className="book-details">
          <div className="small-book">
            <img src={book.img}/>
          </div>
          <div>
            {book.author && <div>
              <p className="book-description-label">Author: </p>
              <p>{book.author}</p>
              </div>}
            {book.publishedDate && <div>
              <p className="book-description-label">Date published: </p>
              <p>{book.publishedDate}</p>
              </div>}
            {book.pageCount && <div>
              <p className="book-description-label">Page count: </p>
              <p>{book.pageCount}</p>
              </div>}
            {book.averageRating && <div>
              <p className="book-description-label">Average rating: </p>
              <p>{book.averageRating} / 5</p>
              </div>}
            {book.description && <div>
              <p className="book-description-label">Description: </p>
              <p id="description"></p>
              </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails;
