import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import ViewDeck from './viewDeck';
import { Button, Card } from 'react-bootstrap';
import { discoverBookService } from '../services/internalApi';
import uuid from 'react-uuid';
import IBook from '../interfaces/IBook'
import IDeck from '../interfaces/IDeck'

function Book({ selectedBook, setSelectedBook, setVoted, voted }: Props) {
  const defaultBook = {title: '', src: '', OLID: ''}
  const [decks, setDecks] = useState<IDeck[] | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);

  useEffect (() => {
    discoverBookService(selectedBook)
      .then(res => setDecks(res));
  }, [selectedBook])

if (selectedDeck) {
  return (
    <ViewDeck
      setVoted={setVoted}
      voted={voted}
      selectedDeck={selectedDeck}
      setSelectedDeck={setSelectedDeck}
      from={"book"}
    ></ViewDeck>
  );
}
else return (
  <div style={{ position: "absolute", top: "130px", zIndex: 1 }}>
    <Button
      className="mx-2 my-4 align-center"
      style={{ position: "absolute", zIndex: 2 }}
      onClick={() => setSelectedBook(defaultBook)}
    >
      Back
    </Button>
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={flexColumnStyle}
    >
      <h2 className="mx-2 my-4 text-center">{selectedBook.title}</h2>
      {selectedBook.src ? (
        <img
          className="mx-2 my-2"
          src={selectedBook.src}
          key={selectedBook._id}
        />
      ) : (
        <div
          className="my-2 mx-2 text-center"
          style={{
            display: "inline-block",
            padding: "2px",
            height: "270px",
            width: "180px",
            fontSize: "20px",
            border: "1px solid rgba(0,0,0,.125)",
            borderRadius: ".25rem",
          }}
          key={selectedBook._id}
        >
          {selectedBook.title.length > 50
            ? selectedBook.title.substring(0, 50) + "..."
            : selectedBook.title}
        </div>
      )}
      {decks ? (
        <h3 className="mx-2 my-4">Available Decks</h3>
      ) : (
        <h3 className="mx-2 my-4">No Decks Available</h3>
      )}
    </div>
    <div
      className="d-flex flex-row align-items-center
      justify-content-center flex-wrap"
      style={flexRowStyle}
    >
      {decks &&
        decks.map((deck: IDeck) => (
          <Card key={uuid()} style={cardStyle} className="mx-2 my-2">
            <Card.Body key={uuid()} className="text-center">
              <p>Creator: {deck.creator}</p>
              <p>Description: {deck.description}</p>
              <p>Cards: {deck.cards.length}</p>
              <div>Votes: {deck.votes}</div>
              <Button className="mt-2" onClick={() => setSelectedDeck(deck)}>
                View Details
              </Button>
            </Card.Body>
          </Card>
        ))}
    </div>
  </div>
);
}


interface Props {
  selectedBook: IBook;
  setSelectedBook: Dispatch<SetStateAction<IBook>>;
  setVoted: Dispatch<SetStateAction<number>>;
  voted: number;
}


const cardStyle = {
  maxWidth: "200px",
  display: "inline-block"
}

const flexRowStyle = {
  width:"99vw",
  position:"absolute" as "absolute",
  top:"52vh"
}

const flexColumnStyle = {
  width:"99vw",
  position:"absolute" as "absolute",
  top:"0vh"
}

export default Book;
