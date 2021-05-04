import HeaderButtons from '../components/headerButtons';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import Flashcards from '../components/flashcards';
import { Button } from 'react-bootstrap';
import { deleteSavedDeckByIdService, getSavedDecksByEmailService } from '../services/internalApi';
import IDeck from '../interfaces/IDeck'

function Study() {
  const authorized = useContext(AuthContext);
  if (!authorized) return null;
  const { currentUser, email } = authorized;
  const URL = 'http://localhost:3001/savedDecks';
  const [savedDecks, setSavedDecks] = useState<IDeck[] | null>(null);
  const [flashcards, setFlashcards] = useState<IDeck | null>(null);
  const [numDeleted, setNumDeleted] = useState<number>(0);

  useEffect(() => {
    const sendEmail = email || currentUser.email;
    if(sendEmail) {
      getSavedDecksByEmailService(sendEmail)
        .then((data) => {
          if (data) setSavedDecks(data[0].savedDecks)
        })
    }
  }, [numDeleted, currentUser, email]);

  function handleDeleteClick (e: React.MouseEvent<HTMLElement, MouseEvent>): void {
    const sendEmail = email || currentUser.email;
    deleteSavedDeckByIdService(sendEmail, e.target.id)
    setNumDeleted(numDeleted + 1);
  }

  if (flashcards !== null) {
    return (
      <div data-testid="study">
      {currentUser ?
        <Flashcards flashcards={flashcards} setFlashcards={setFlashcards}></Flashcards>
        : <h1>Access Unauthorized</h1>}
      </div>
    )
  } else return (
    <div data-testid="study" key="study">
      {currentUser? (
        <div key="study2">
          <HeaderButtons key="headerbuttons"></HeaderButtons>
          {(savedDecks) ?
            (<>
            <h1 className="mx-2 my-4" key="title">My Saved Decks</h1>
          <div
            key="deckList"
            className="d-flex flex-row align-items-center     justify-content-start mx-2 mt-2">
            {savedDecks.map((deck: IDeck) =>
              deck.src ? (
                <div
                  style={{ display: "inline-block" }}
                  className="mx-2 my-2"
                  key={`divmain${deck._id}`}
                >
                  <img
                    data-testid={`setflash${deck._id}`}
                    key={`img${deck._id}`}
                    className="mx-2 my-2"
                    src={deck.src}
                    width="150px"
                    height="auto"
                    alt={`setflash${deck._id}`}
                    onClick={() => setFlashcards(deck)}
                  />
                  <Button
                    key={`button${deck._id}`}
                    className="mx-2 my-2"
                    type="button"
                    id={deck._id}
                    onClick={handleDeleteClick}
                  >
                    ❌
                  </Button>
                </div>
              ) : (
                <div
                  style={{ display: "inline-block" }}
                  className="mx-2 my-2 d-flex flex-row align-items-center justify-content-center"
                  key={`div${deck._id}`}
                >
                  <div
                    className="my-2 mx-2 text-center"
                    style={{
                      height: "220px",
                      width: "150px",
                      fontSize: "20px",
                      border: "1px solid rgba(0,0,0,.125)",
                      borderRadius: ".25rem",
                      padding: "2px",
                    }}
                    onClick={() => setFlashcards(deck)}
                  >
                    {deck.title.length > 50
                      ? deck.title.substring(0, 50) + "..."
                      : deck.title}
                  </div>
                  <Button
                    className="mx-2 my-2"
                    type="button"
                    id={`button2${deck._id}`}
                    onClick={handleDeleteClick}
                  >
                    ❌
                  </Button>
                </div>
              )
            )}
          </div>
          </>) : (<div>No decks saved.</div>)}
        </div>
      ) : (
        <h1>Access Unauthorized</h1>
      )}
    </div>
  );
}

export default Study;
