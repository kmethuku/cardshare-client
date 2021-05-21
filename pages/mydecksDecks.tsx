import React, { useState, useEffect, useContext } from 'react';
import ViewDeck from '../components/viewDeck';
import NewDeck from '../components/newDeck';
import { AuthContext } from '../contexts/AuthContext';
import { getDeckByEmailService, deleteDeckByIdService } from '../services/internalApi'
import IDeck from '../interfaces/IDeck'

function Create() {
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [deckList, setDeckList] = useState<any[]>([]);
  const [clickedItem, setClickedItem] = useState<string>('');
  const [selectedDeck, setSelectedDeck] = useState<IDeck | null>(null);
  const URL:string = "http://localhost:3001/myDecks";
  const context = useContext(AuthContext);
  if (!context) return null;
  const { currentUser, email } = context;

  useEffect(() => {
    let emailArg = email|| currentUser.email;
    if (emailArg) {
      getDeckByEmailService(emailArg)
      .then(res => {
        res && setDeckList(res);
      })
    }
  }, [deleteCount, clickedItem]);

  function handleDeleteClick(e: React.FormEvent): void {
    const target = e.target as HTMLElement
    let emailArg = email ||currentUser.email;
    deleteDeckByIdService(emailArg, target.id)
    setDeleteCount(deleteCount + 1);
  }

  if (clickedItem === "viewDeck") {
    return (
      <div>
        {currentUser ?
          <ViewDeck selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} from={'myDeck'} setClickedItem={setClickedItem}></ViewDeck>
          : <h1>Access Unauthorized</h1>}
      </div>
      )

  } else if (clickedItem === "createDeck") {
    return (
      <div>
        {currentUser ? (
          <NewDeck setClickedItem={setClickedItem} />
        ) : (
          <h1>Access Unauthorized</h1>
        )}
      </div>
    );
  } else
    return (
      <div>
        {currentUser ? (
          <div>
            <div
              className="d-flex align-items-center
            justify-content-between mx-2"
            >
              <h1 className="mx-2 my-4">My Decks</h1>
              <button
                className="mx-2 my-4"
                type="button"
                onClick={() => setClickedItem("createDeck")}
              >
                Create a New Deck
              </button>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-start mx-2">
              {deckList &&
                deckList.map((deck) =>
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
                        onClick={() => {
                          setClickedItem("viewDeck");
                          setSelectedDeck(deck);
                        }}
                      />
                      <button
                        className="mx-2 my-2"
                        type="button"
                        id={deck._id}
                        onClick={handleDeleteClick}
                      >
                        ❌
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ display: "inline-block" }}
                      className="mx-2 my-2 d-flex flex-row align-items-center
                justify-content-center"
                      key={deck._id}
                    >
                      <div
                        className="my-2 mx-2 text-center"
                        style={deckStyle}
                        onClick={() => {
                          setClickedItem("viewDeck");
                          setSelectedDeck(deck);
                        }}
                      >
                        {deck.title.length > 50
                          ? deck.title.substring(0, 50) + "..."
                          : deck.title}
                      </div>
                      <button
                        className="mx-2 my-2"
                        type="button"
                        id={deck._id}
                        onClick={handleDeleteClick}
                      >
                        ❌
                      </button>
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

const deckStyle = {
  height: "220px",
  width: "150px",
  fontSize: "20px",
  border: "1px solid rgba(0,0,0,.125)",
  borderRadius: ".25rem",
  padding: "2px",
};

export default Create;
