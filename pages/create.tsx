import React, { useState, useEffect } from 'react';
import HeaderButtons from '../components/headerButtons';
import ViewDeck from '../components/viewDeck';
import NewDeck from '../components/newDeck';
import { useAuth } from '../contexts/AuthContext';
import { Button } from 'react-bootstrap';

function Create() {
  const [deleteCount, setDeleteCount] = useState<number>(0);
  const [deckList, setDeckList] = useState<any[]>([]);
  const [clickedItem, setClickedItem] = useState<string>("");
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const URL:string = "http://localhost:3001/myDecks";
  const { currentUser, email } = useAuth();
  //console.log(email);

  useEffect(() => {
    if (currentUser.email || email) {
      fetch(`${URL}/${email || currentUser.email}`)
        .then((data) => data.json())
        .then((res) =>
          res[0] ? setDeckList(res[0].myDecks) : setDeckList(deckList)
        ); // add setDeckList(res[0].myDecks
    }
  }, [deleteCount, clickedItem]);

  function handleDeleteClick(e: React.FormEvent): void {
    const {
      target: { id },
    } = e;
    fetch(`${URL}/${email || currentUser.email}-${id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then((data) => data.json());
    setDeleteCount(deleteCount + 1);
  }

  if (clickedItem === "viewDeck") {
    return (
      <div>
        {currentUser ? (
          <ViewDeck
            selectedDeck={selectedDeck}
            setSelectedDeck={setSelectedDeck}
            from={"myDeck"}
            setClickedItem={setClickedItem}
          />
        ) : (
          <h1>Access Unauthorized</h1>
        )}
      </div>
    );
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
            <HeaderButtons />
            <div
              className="d-flex align-items-center
            justify-content-between mx-2"
            >
              <h1 className="mx-2 my-4">My Decks</h1>
              <Button
                className="mx-2 my-4"
                type="button"
                onClick={() => setClickedItem("createDeck")}
              >
                Create a New Deck
              </Button>
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

const deckStyle = {
  height: "220px",
  width: "150px",
  fontSize: "20px",
  border: "1px solid rgba(0,0,0,.125)",
  borderRadius: ".25rem",
  padding: "2px",
};

export default Create;
