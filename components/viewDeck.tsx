import React, { Dispatch, SetStateAction } from 'react';
import HeaderButtons from './headerButtons';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { saveDeckService, voteService, getDeckByIdService } from '../services/internalApi'
import uuid from 'react-uuid';

type Props = {
  selectedDeck: any,
  setSelectedDeck: Dispatch<SetStateAction<any>>,
  from: any,
  setClickedItem?: Dispatch<SetStateAction<any>>,
  setVoted?: Dispatch<SetStateAction<number>>,
  voted?: number,
}

function ViewDeck({
  selectedDeck,
  setSelectedDeck,
  from,
  setClickedItem = () => {},
  setVoted,
  voted,
}: Props) {
  // const saveURL = "http://localhost:3001/savedDecks";
  // const voteURL = "http://localhost:3001/discover/vote";
  // const getDeckURL = "http://localhost:3001/discover";
  const authorized = useAuth();
  if (!authorized) return null;
  const { currentUser, email } = authorized;
  const router = useRouter();

  function handleClick() {
    saveDeckService(email, selectedDeck)

    // fetch(saveURL + "/" + email, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(selectedDeck),
    // }).then((data) => data.json());

    if (setVoted && voted) setVoted(voted + 1);
    router.push("/study");
  }

  async function handleVote(direction: string) {
    // fetch(voteURL + "/" + selectedDeck._id + "-" + direction, {
    //   method: "POST",
    // }).then((data) => data.json());
    // fetch(getDeckURL + `/${selectedDeck._id}`)
    //   .then((data) => data.json())
    //   .then((res) => {
    //     res[0].myDecks[0].username = res[0].username;
    //     setSelectedDeck(res[0].myDecks[0]);
    //   });
    voteService(selectedDeck._id, direction)
    const result = await getDeckByIdService(selectedDeck._id)
    setSelectedDeck(result);
    if (setVoted && voted) setVoted(voted + 1);
  }

  return (
    <div>
      {from !== "book" && <HeaderButtons></HeaderButtons>}
      <div style={{ position: "absolute", top: "130px", zIndex: 1 }}>
        {from === "myDeck" ? (
          <Button
            style={{ position: "absolute", zIndex: 2 }}
            className="mx-2 my-4"
            onClick={() => setClickedItem("")}
          >
            Back
          </Button>
        ) : (
          <Button
            style={{ position: "absolute", zIndex: 2 }}
            className="mx-2 my-4"
            onClick={() => setSelectedDeck("")}
          >
            Back
          </Button>
        )}
        <div
          className="d-flex flex-column align-items-center
          justify-content-between"
          style={{ width: "99vw", position: "absolute", top: "0vh" }}
        >
          <h2 className="mx-2 my-4 text-center">{selectedDeck.title}</h2>
          {selectedDeck.src ? (
            <img
              className="mx-2 my-2"
              src={selectedDeck.src}
              key={selectedDeck._id}
            />
          ) : (
            <div
              className="my-2 mx-2 text-center"
              style={{
                height: "270px",
                width: "180px",
                fontSize: "20px",
                border: "1px solid rgba(0,0,0,.125)",
                borderRadius: ".25rem",
                padding: "2px",
              }}
              key={selectedDeck._id}
            >
              {selectedDeck.title.length > 50
                ? selectedDeck.title.substring(0, 50) + "..."
                : selectedDeck.title}
            </div>
          )}
          <h4 className="mx-2 mt-3">Description: {selectedDeck.description}</h4>
        </div>
        <div
          className="d-flex flex-row align-items-center
          justify-content-center"
          style={{ width: "99vw", position: "absolute", top: "48vh" }}
        >
          {from !== "myDeck" ? (
            <Button type="button" onClick={() => handleVote("down")}>
              👎
            </Button>
          ) : (
            <Button type="button" disabled onClick={() => handleVote("down")}>
              👎
            </Button>
          )}
          <p className="mx-2 my-2">{selectedDeck.votes}</p>
          {from !== "myDeck" ? (
            <Button type="button" onClick={() => handleVote("up")}>
              👍
            </Button>
          ) : (
            <Button type="button" disabled onClick={() => handleVote("up")}>
              👍
            </Button>
          )}
        </div>
        <div
          className="d-flex flex-row align-items-center
          justify-content-center"
          style={{ width: "99vw", position: "absolute", top: "52vh" }}
        >
          <p className="mx-2 my-3">Creator: {selectedDeck.creator}</p>
          <Button type="button" onClick={handleClick}>
            Save Deck
          </Button>
        </div>
        <div
          className="d-flex flex-row align-items-center
          justify-content-center flex-wrap"
          style={{ width: "99vw", position: "absolute", top: "57vh" }}
        >
          {selectedDeck.cards.map((card: any) => (
            <Card
              key={uuid()}
              style={{ maxWidth: "200px" }}
              className="mx-2 my-2"
            >
              <Card.Body key={uuid()} className="text-center">
                <div className="mx-2 my-2">Question: {card.question}</div>
                <div className="mx-2 my-2">Answer: {card.answer}</div>
              </Card.Body>
              {/* <div>{card.highlight}</div> */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewDeck;
