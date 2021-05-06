import React, { useState, Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { AuthContext, useAuth } from '../../../contexts/AuthContext';
import IDeck from '../../../interfaces/IDeck'
import ICard from '../../../interfaces/ICard';
import { useRouter } from 'next/router';
import Container from '../../../components/Container';
import Card from '../../../components/Card';
import ListFlashcards from '../../../components/listFlashcards'
import{ getDeckByIdService, getUserService, voteService, getSavedDecksByEmailService, saveDeckService } from '../../../services/internalApi'

function ViewDeck () {
    const context = useContext(AuthContext);
    if (!context || !context.currentUser.email) return null;
    const { currentUser, email } = context;
    const router = useRouter();
    const {id} = router.query;
    const [deck, setDeck] = useState<IDeck | null>(null);
    const [upvoted, setUpvoted] = useState<boolean>(false);
    const [downvoted, setDownvoted] = useState<boolean>(false);
    const[username, setUsername] = useState<string>("")

    const setState = async (email) => {
      let deck = await getDeckByIdService(id);
      setDeck(deck);
      let user = await getUserService(email);
      setUsername(user[0].username);
    }

    useEffect(() => {
        const sendEmail = currentUser.email || email;
        console.log(sendEmail)
        if(sendEmail) {
          setState(sendEmail);
        }
    }, [router, deck])

  const handleSave = () => {
    const sendEmail = currentUser.email || email;
    getSavedDecksByEmailService(sendEmail)
    .then((data) => {
        const dupes = data[0].savedDecks.filter((book:any)=>{
          return book._id===deck?._id;
        })
        if(dupes.length!==0) {alert("Already in your study decks.")}
        else {
          saveDeckService(sendEmail, deck)
          .then (() => router.push("/study"))
        }
    });
  }

  const voteHandler = (direction:string) => {
    if (direction === "up" && upvoted===false) {
      voteService(deck?._id, direction);
      setUpvoted(true);
    } else if (direction==="down" && downvoted===false) {
      voteService(deck?._id, direction);
      setDownvoted(true)
    }
  }

  return(
    deck ? (
    <Container>
    <div className="deckViewInfo">
        <img className="deckViewBookCover" src={deck.src}/>
        <div className="deckViewInfoRight">
            <div className="deckViewInfoRightTitle">{deck?.title}</div>
            <div className="deckViewInfoRightDescription">{deck?.description}</div>
            <div className="deckViewInfoRightCreator">Created by:{` ${deck?.creator}`}</div>

            <div className="deckViewInfoRightVotes">
              {username!==deck?.creator && <span className="voteButton" onClick={()=>voteHandler("up")}>👍</span>}
              {`  Votes:`}<span>{` ${deck?.votes}  `}</span>
              {username!==deck?.creator && <span className="voteButton" onClick={()=>voteHandler("down")}>👎</span>}
            </div>
            <button type="button" className="saveButton" onClick={handleSave}>Save Deck</button>
        </div>
    </div>
    <div className="deckViewFlashcardBottom">
      <div className="deckViewFlashcardHeader">Flashcards</div>
      <ListFlashcards deck={deck} />
    </div>
  </Container>) : (<div>loading...</div>)
  )
}

export default ViewDeck;