import React, { Dispatch, SetStateAction, useContext } from 'react';
import HeaderButtons from './headerButtons';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
import { saveDeckService, voteService, getDeckByIdService } from '../services/internalApi'
import uuid from 'react-uuid';
import IDeck from '../interfaces/IDeck'
import ICard from '../interfaces/ICard'

type Props = {
  selectedDeck: IDeck | null,
  setSelectedDeck: Dispatch<SetStateAction<IDeck | null>>,
  from: string,
  setClickedItem?: Dispatch<SetStateAction<string>>,
  setVoted?: Dispatch<SetStateAction<number>>,
  voted?: number,
}

function ViewDeck({ selectedDeck, setSelectedDeck, from, setClickedItem = () => {}, setVoted, voted }: Props) {
  const authorized = useContext(AuthContext);
  if (!authorized) return null;
  const { currentUser, email } = authorized;
  const router = useRouter();

  function handleClick() {
    let sendEmail = currentUser.email || email;
    saveDeckService(sendEmail, selectedDeck)
    if (setVoted && voted) setVoted(voted + 1);
    router.push("/study");
  }

  async function handleVote(direction: string) {
    if(selectedDeck && selectedDeck._id) {
      voteService(selectedDeck._id, direction)
      const result = await getDeckByIdService(selectedDeck._id)
      setSelectedDeck(result);
    }
    if (setVoted && voted) setVoted(voted + 1);
  }

  return (
    <div>
      {from !== "book" && <HeaderButtons />}
      <div style={{ position: "absolute", top: "130px", zIndex: 1 }}>
        {from === "myDeck" ? (
          <button
            style={{ position: "absolute", zIndex: 2 }}
            className="mx-2 my-4"
            onClick={() => setClickedItem("")}
          >
            Back
          </button>
        ) : (
          <button
            style={{ position: "absolute", zIndex: 2 }}
            className="mx-2 my-4"
            onClick={() => setSelectedDeck(null)}
          >
            Back
          </button>
        )}
        <div
          className="d-flex flex-column align-items-center
          justify-content-between"
          style={{ width: "99vw", position: "absolute", top: "0vh" }}
        >
          <h2 className="mx-2 my-4 text-center">{selectedDeck?.title}</h2>
          {selectedDeck?.src ? (
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
              key={selectedDeck?._id}
            >
              {selectedDeck && selectedDeck.title.length > 50
                ? selectedDeck.title.substring(0, 50) + "..."
                : selectedDeck?.title}
            </div>
          )}
          <h4 className="mx-2 mt-3">Description: {selectedDeck?.description}</h4>
        </div>
        <div
          className="d-flex flex-row align-items-center
          justify-content-center"
          style={{ width: "99vw", position: "absolute", top: "48vh" }}
        >
          {from !== "myDeck" ? (
            <button type="button" onClick={() => handleVote("down")}>
              👎
            </button>
          ) : (
            <button type="button" disabled onClick={() => handleVote("down")}>
              👎
            </button>
          )}
          <p className="mx-2 my-2">{selectedDeck?.votes}</p>
          {from !== "myDeck" ? (
            <button type="button" onClick={() => handleVote("up")}>
              👍
            </button>
          ) : (
            <button type="button" disabled onClick={() => handleVote("up")}>
              👍
            </button>
          )}
        </div>
        <div
          className="d-flex flex-row align-items-center
          justify-content-center"
          style={{ width: "99vw", position: "absolute", top: "52vh" }}
        >
          <p className="mx-2 my-3">Creator: {selectedDeck?.creator}</p>
          <button type="button" onClick={handleClick}>
            Save Deck
          </button>
        </div>
        <div
          className="d-flex flex-row align-items-center
          justify-content-center flex-wrap"
          style={{ width: "99vw", position: "absolute", top: "57vh" }}
        >
          {selectedDeck?.cards.map((card: ICard) => (
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
