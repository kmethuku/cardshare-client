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
    const shortDesc = book?.description?.slice(0, 750) + "..."
    if (html) html.innerHTML = shortDesc;
  },[book])

  const handleNewDeck = () => {
    router.push("/create")
  }

  return (
    <Container>
      <h3>{book.title}</h3>
      <button
        type="button"
        className="buttonNewDeck"
        onClick={handleNewDeck}> Create New Deck
      </button>
      <div className="bookgrid">
        <div>
          <img src={book.img} />
        </div>
        <div>
          {book.author && <p><span>Author: </span>{book.author}</p>}
          {book.publishedDate && <p><span>Date published: </span>{book.publishedDate}</p>}
          {book.pageCount && <p><span>Page count: </span>{book.pageCount}</p>}
          {book.averageRating && <p><span>Average rating: </span>{book.averageRating} / 5</p>}
          {book.link && <p><a href={book.link}>External Link</a></p>}
          {book.description && <p><span>Description: </span><span id="description"></span></p>}
        </div>
      </div>
    </Container>
  )
}

export default BookDetails
