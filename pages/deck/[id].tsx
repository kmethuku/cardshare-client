import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import IDeck from '../../interfaces/IDeck'
import { useRouter } from 'next/router';
import ListFlashcards from '../../components/listFlashCards';
import{ getDeckByIdService, getUserService, voteService, getSavedDecksByEmailService, saveDeckService } from '../../services/internalApi';
import HeaderButtons from '../../components/headerButtons';

function ViewDeck () {
  const context = useContext(AuthContext);
  if (!context || !context.currentUser.email) return null;
  const { currentUser, email } = context;
  const router = useRouter();
  const { id } = router.query;
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const setState = async (email:string) => {
    let deck = await getDeckByIdService(id);
    setDeck(deck);
    let user = await getUserService(email);
    setUsername(user[0].username);
  }

  useEffect(() => {
    const sendEmail = currentUser.email || email;
    if (sendEmail) {
      setState(sendEmail);
    }
  }, [upvoted, downvoted])

  useEffect(() => {
    getSavedDecksByEmailService(currentUser.email || email)
    .then((data) => data[0].savedDecks.find((book:any) => {
      if (book._id === deck?._id) {
        setIsSaved(true);
        return true;
      } else return false;
    }));
  }, [deck])

  const handleSave = () => {
    saveDeckService(currentUser.email || email, deck)
    .then(() => router.push('/study'));
  }

  const voteHandler = (direction:string) => {
    if (direction === 'up' && upvoted === false) {
      voteService(deck?._id, direction);
      setUpvoted(true);
      setDownvoted(false);
    } else if (direction === 'down' && downvoted === false) {
      voteService(deck?._id, direction);
      setDownvoted(true);
      setUpvoted(false);
    }
  }

  return(
    deck ? (
    <div>
      <HeaderButtons/>
      <div className="page-container deck-details">
        <h2 className="header">{deck.title}</h2>
        <img src={deck.src}/>
        <div>
          <p className="label">Description:</p>
          <div>{deck.description}</div>
          <p className="label">Created by:</p>
          <div>{deck.creator}</div>
            <div className="voting">
              {username !== deck.creator ? <button disabled={upvoted} className="round-button" type="submit" onClick={()=>voteHandler("up")}><img src="/upvote.png" width="15" height="auto"></img></button> : <p className="label">Votes:</p>}
              <div>{deck.votes}</div>
              {username !== deck.creator && <button disabled={downvoted} className="round-button" type="submit" onClick={()=>voteHandler("down")}><img src="/downvote.png" width="15" height="auto"></img></button>}
            </div>
        </div>
        {isSaved ? <button type="button" disabled>Saved</button> :
          <button type="button" onClick={handleSave}>Save Deck</button>}
        <p className="label">Flashcards:</p>
        <ListFlashcards deck={deck} />
      </div>
  </div>) : (<div>loading...</div>)
  )
}

export default ViewDeck;