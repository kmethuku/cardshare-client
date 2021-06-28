import React, { useState, Dispatch, SetStateAction } from 'react';
import { searchBookService } from '../services/externalApi';
import IBook from '../interfaces/IBook';
import { NextRouter, useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';
import { useEffect } from 'react';

type Props = {
  setSelectedBook?: Dispatch<SetStateAction<IBook>>,
  setNewDeck?: Dispatch<SetStateAction<any>>,
  newDeck?: IDeck,
}

const SearchBar: React.FC<Props> = ({ setSelectedBook, setNewDeck, newDeck }) => {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState<string>('');
  const [time, setTime] = useState<number>(0);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (newDeck?.title) setInput(newDeck.title);
  }, [])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<any> => {
    setInput(e.target.value);
    if (!e.target.value) setResults([]);
  }

  const delay = async () => {
    let newTime: number = new Date().getTime();
    if (newTime - time > 200) {
      if (input === '') setResults([]);
      else {
        let query: string = input.split(' ').join('+');
        try {
          let result = await searchBookService(query);
          setResults(result);
        } catch (err) {
          alert('Sorry, an error occurred.');
        }
      }
    }
    setTime(newTime);
  }

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    const target = e.target as HTMLImageElement;
    if (setNewDeck) {
      setNewDeck({
        ...newDeck,
        title: target.title,
        src: target.src,
        OLID: target.id,
      });
      setInput(target.title);
    }
    else if (setSelectedBook) {
      setSelectedBook({
        title: target.title,
        src: target.src,
        OLID: target.id
      });
      setInput('');
      router.push(`/book/${target.id}`);
    }
    setResults([]);
  }

  return (
    <div>
      <div className="search-area">
        <input
          className="search-area__input"
          onKeyUp={delay}
          value={input}
          onChange={handleChange}
        />
        <img src="/search-icon.png" width="20" height="auto"/>
      </div>
      {results.length > 0 && <div className="scroll">
        {results.map((book: any) => {
          return (
            <div
              key={book.id}
              onClick={handleClick}
            >
              {book.volumeInfo.imageLinks ? (
                <div className="small-book">
                  <p className="label">{book.volumeInfo.title && book.volumeInfo.title.length > 30 ? book.volumeInfo.title.substring(0, 30).concat('...') : book.volumeInfo.title}</p>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    title={book.volumeInfo.title}
                    id={book.id}
                    />
                </div>
              ) :
                <p className="label">{book.volumeInfo.title && book.volumeInfo.title.length > 30 ? book.volumeInfo.title.substring(0, 30).concat('...') : book.volumeInfo.title}</p>
              }
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default SearchBar;
