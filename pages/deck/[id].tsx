import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import IDeck from '../../interfaces/IDeck'
import { NextRouter, useRouter } from 'next/router';
import ListFlashcards from '../../components/listFlashCards';
import{ getDeckByIdService, getUserService, voteService, getSavedDecksByEmailService, saveDeckService } from '../../services/internalApi';
import HeaderButtons from '../../components/headerButtons';
import IBook from '../../interfaces/IBook';
import Link from 'next/link';
import Loader from '../../components/loader';

function ViewDeck () {
  const { currentUser, email } = useContext(AuthContext);
  const router: NextRouter = useRouter();
  const { id } = router.query;
  const [deck, setDeck] = useState<IDeck | null>(null);
  const [upvoted, setUpvoted] = useState<boolean>(false);
  const [downvoted, setDownvoted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getSavedDecksByEmailService(currentUser.email || email)
      .then((data) => data[0].savedDecks.find((book: IBook) => {
        if (book._id === deck?._id) {
          setIsSaved(true);
          return true;
        } else return false;
      }))
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        alert('Sorry, an error occurred.');
      });
    getUserService(currentUser.email || email)
    .then((user) => setUsername(user[0].username))
    .catch((err) => alert('Sorry, an error occurred.'));
  }, [])

  useEffect(() => {
    getDeckByIdService(id)
      .then((deck) => setDeck(deck))
      .catch((err) => alert('Sorry, an error occurred.'));
  }, [upvoted, downvoted])

  const handleSave = () => {
    setLoading(true);
    saveDeckService(currentUser.email || email, deck)
    .then(() => setLoading(false))
    .then(() => router.push('/study'))
    .catch((err) => {
      setLoading(false);
      alert('Sorry, an error occurred.');
    });
  }

  const voteHandler = (direction: string) => {
    if (direction === 'up' && upvoted === false) {
      voteService(deck?._id, direction)
        .catch((err) => alert('Sorry, an error occurred.'));
      setUpvoted(true);
      setDownvoted(false);
    } else if (direction === 'down' && downvoted === false) {
      voteService(deck?._id, direction)
        .catch((err) => alert('Sorry, an error occurred.'));
      setDownvoted(true);
      setUpvoted(false);
    }
  }

  if (loading) return <Loader/>;
  return (
    deck && (
    <div>
      <HeaderButtons/>
      <div className="page-container center-text">
      {currentUser.uid ?
      <div>
        <h2 className="header">{deck.title}</h2>
        <div className="small-book">
          {deck.src && <img
            src={deck.src}/>}
        </div>
        <div>
          <p className="label">Description:</p>
          <div>{deck.description}</div>
          <p className="label">Created by:</p>
          <div>{deck.creator}</div>
            <div className="flex-row">
              {username !== deck.creator ? <button disabled={upvoted} className="round-button" type="button" onClick={()=>voteHandler('up')}><img src="/upvote.png" width="15" height="auto"/></button> : <p className="label">Votes:</p>}
              <div>{deck.votes}</div>
              {username !== deck.creator && <button disabled={downvoted} className="round-button" type="button" onClick={()=>voteHandler('down')}><img src="/downvote.png" width="15" height="auto"/></button>}
            </div>
        </div>
        {isSaved ? <button type="button" disabled>Saved</button> :
          <button type="button" onClick={handleSave}>Save Deck</button>}
        <p className="label">Flashcards ({deck.cards.length}):</p>
        <ListFlashcards deck={deck}/>
      </div> :
      <h2 className="header center-text">You are not authorized to access this page. Please <Link href="/">log in</Link>.
      </h2>}
    </div>
  </div>)
  )
}

export default ViewDeck;