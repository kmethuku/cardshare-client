import HeaderButtons from '../components/headerButtons';
import { useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import Flashcards from '../components/flashcards';
import { Button } from 'react-bootstrap';
import { deleteSavedDeckByIdService, getSavedDecksByEmail } from '../services/internalApi';

function Study() {
  const authorized = useAuth();
  if (!authorized) return null;
  const { currentUser, email } = authorized;
  const URL = 'http://localhost:3001/savedDecks';
  const [savedDecks, setSavedDecks] = useState([]);
  const [flashcards, setFlashcards] = useState('');
  const [numDeleted, setNumDeleted] = useState(0);

  useEffect(() => {
    const sendEmail = email || currentUser.email;
    getSavedDecksByEmail(sendEmail)
      .then((data) => {
        if (data) setSavedDecks(data)
      })

    // fetch(URL + `/${email || currentUser.email}`).then(data => data.json()).then(res => res[0] ? setSavedDecks(res[0].savedDecks) : setSavedDecks(savedDecks));
  }, [numDeleted]);

  function handleDeleteClick(e:any) {
    const sendEmail = email || currentUser.email;
    deleteSavedDeckByIdService(sendEmail, e.target.id)

    // fetch(`${URL}/${email || currentUser.email}-${e.target.id}`, {
    //   method: 'DELETE'
    // }).then(data => data.json()).then(data => data.json());
    setNumDeleted(numDeleted + 1);
  }

  if (flashcards) {
    return (
      <div>
      {currentUser ?
        <Flashcards flashcards={flashcards} setFlashcards={setFlashcards}></Flashcards>
        : <h1>Access Unauthorized</h1>}
      </div>
    )
  } else return (
    <div>
      {currentUser ? (
        <div>
          <HeaderButtons></HeaderButtons>
          <h1 className="mx-2 my-4">My Saved Decks</h1>
          <div
            className="d-flex flex-row align-items-center
          justify-content-start mx-2 mt-2"
          >
            {savedDecks.map((deck: any) =>
              deck.src ? (
                <div
                  style={{ display: "inline-block" }}
                  className="mx-2 my-2"
                  key={deck._id}
                >
                  <img
                    className="mx-2 my-2"
                    src={deck.src}
                    width="150px"
                    height="auto"
                    onClick={() => setFlashcards(deck)}
                  />
                  <Button
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
                  key={deck._id}
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
                    // width="150px"
                    // height="auto"
                    onClick={() => setFlashcards(deck)}
                  >
                    {deck.title.length > 50
                      ? deck.title.substring(0, 50) + "..."
                      : deck.title}
                  </div>
                  <Button
                    className="mx-2 my-2"
                    type="button"
                    id={deck._id}
                    onClick={handleDeleteClick}
                  >
                    ❌
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <h1>Access Unauthorized</h1>
      )}
    </div>
  );
}

export default Study;
