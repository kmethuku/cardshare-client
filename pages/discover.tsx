import Navbar from '../components/navbar';
import HeaderButtons from '../components/headerButtons';
import React, { useState, useEffect, useContext } from 'react';
import Book from '../components/book';
import { useAuth, AuthContext } from '../contexts/AuthContext';
import { getDecksByGenreService } from '../services/internalApi';
import { discoverSearchingService, searchBookService } from '../services/externalApi';
import IBook from '../interfaces/IBook'
import IDeck from '../interfaces/IDeck'

function Discover() {
  const defaultBook = {title: '', src:'', OLID: ''}
  const [selectedBook, setSelectedBook] = useState<IBook>(defaultBook);
  const [voted, setVoted] = useState<number>(0);
  const [popular, setPopular] = useState<IDeck[]>([]);
  const [selfGrowth, setSelfGrowth] = useState<IDeck[]>([]);
  const [history, setHistory] = useState<IDeck[]>([]);
  const authorized = useContext(AuthContext)
  if (!authorized) return null;
  const { currentUser } = authorized;

  useEffect(() => {
    const getDecksByGenre = async (): Promise<any> => {
      const discover = await getDecksByGenreService('discover')
      setPopular(discover);
      const selfGrowth = await getDecksByGenreService('self-growth')
      setSelfGrowth(selfGrowth)
      const history = await getDecksByGenreService('history')
      setHistory(history)
    }
    getDecksByGenre();
  }, [voted])

  async function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLImageElement;
    if (target.title) {
      let query = target.title.split(" ").join("+");
      let searchResult = await discoverSearchingService(query, target.id);
      setSelectedBook(searchResult)
    }
  }

  return (
    <div onClick={handleClick}>
      {currentUser ? (
        <div style={{ position: "relative" }}>
          <HeaderButtons />
          <div className="mx-2">
            <div style={{ position: "relative", zIndex: 2 }}>
              <Navbar setSelectedBook={setSelectedBook} />
            </div>
            {selectedBook.title ? (
              <Book
                setVoted={setVoted}
                voted={voted}
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
              />
            ) : (
              <div style={{ position: "absolute", top: "130px", zIndex: 1 }}>
                <h2 className="mt-4">Discover New Decks</h2>
                <h3 className="mt-4">Popular</h3>
                <div
                  className="d-flex flex-row align-items-center
                justify-content-start mx-2 mt-2"
                >
                  {popular.map((deck: IDeck) => {
                    return deck.src ? (
                      <img
                        src={deck.src}
                        className="mx-3 my-2"
                        width="150px"
                        height="auto"
                        key={deck._id}
                        id={deck.OLID}
                        title={deck.title}
                        onClick={handleClick}
                      />
                    ) : (
                      <div
                        key={deck._id}
                        className="my-3 mx-2 text-center"
                        style={{
                          height: "220px",
                          width: "150px",
                          fontSize: "20px",
                          border: "1px solid rgba(0,0,0,.125)",
                          borderRadius: ".25rem",
                          padding: "2px",
                        }}
                        id={deck.OLID}
                        title={deck.title}
                        onClick={handleClick}
                      >
                        {deck.title.length > 50
                          ? deck.title.substring(0, 50) + "..."
                          : deck.title}
                      </div>
                    );
                  })}
                </div>
                <h3 className="mt-4">Self-Growth</h3>
                <div
                  className="d-flex flex-row align-items-center
                justify-content-start mx-2 mt-2"
                >
                  {selfGrowth.map((deck) => {
                    return deck.src ? (
                      <img
                        src={deck.src}
                        className="mx-3 my-2"
                        width="150px"
                        height="auto"
                        key={deck._id}
                        id={deck.OLID}
                        title={deck.title}
                        onClick={handleClick}
                      />
                    ) : (
                      <div
                        key={deck._id}
                        className="my-3 mx-2 text-center"
                        style={{
                          display: "inline-block",
                          padding: "2px",
                          height: "220px",
                          width: "150px",
                          fontSize: "20px",
                          border: "1px solid rgba(0,0,0,.125)",
                          borderRadius: ".25rem",
                        }}
                        id={deck.OLID}
                        title={deck.title}
                        onClick={handleClick}
                      >
                        {deck.title.length > 50
                          ? deck.title.substring(0, 50) + "..."
                          : deck.title}
                      </div>
                    );
                  })}
                </div>
                <h3 className="mt-4">History</h3>
                <div
                  className="d-flex flex-row align-items-center
                justify-content-start mx-2 mt-2"
                >
                  {history.map((deck) => {
                    return deck.src ? (
                      <img
                        src={deck.src}
                        className="mx-3 my-2"
                        width="150px"
                        height="auto"
                        key={deck._id}
                        id={deck.OLID}
                        title={deck.title}
                        onClick={handleClick}
                      />
                    ) : (
                      <div
                        key={deck._id}
                        className="my-3 mx-2 text-center"
                        style={{
                          height: "220px",
                          width: "150px",
                          fontSize: "20px",
                          border: "1px solid rgba(0,0,0,.125)",
                          borderRadius: ".25rem",
                          padding: "2px",
                        }}
                        id={deck.OLID}
                        title={deck.title}
                        onClick={handleClick}
                      >
                        {deck.title.length > 50
                          ? deck.title.substring(0, 50) + "..."
                          : deck.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h1>Access Unauthorized</h1>
      )}
    </div>
  );
}

export default Discover;
