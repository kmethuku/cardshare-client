import React, { useState, useEffect, useContext } from 'react';
import { getDecksByGenreService } from '../services/internalApi';
import Link from 'next/link'

const ListBook = ({title}: Props) => {
  const [bookList, setBookList] = useState<any>(null)

  useEffect(() => {
    const getDecksByGenre = async (): Promise<any> => {
      const tempList = await getDecksByGenreService(title)
      setBookList(tempList)
    }
    getDecksByGenre();
  }, [])

  return (
    <div>
      <h2>{title}</h2>
      <div className="scroll">
      {bookList &&
        bookList.map((book: any) => (
          <Link key={`${title}${book._id}`} href={`/book/${book.OLID}`}>
            <div className="small-book">
              <img
                src={book.src} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

interface Props {
  title: string
}

export default ListBook
