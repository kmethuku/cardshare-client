import React, { Dispatch, SetStateAction, useContext } from 'react';
import IDeck from '../interfaces/IDeck';
import { AuthContext } from '../contexts/AuthContext';
import Deck from './Deck'
import { deleteSavedDeckByIdService, deleteDeckByIdService } from '../services/internalApi';

type Props = {
    decks: IDeck[],
    setDecks: Dispatch<SetStateAction<IDeck[]>>,
    type: String,
}

function ListDecks ({ decks, setDecks, type }:Props) {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;

    const deleteHandler = (deck:any)=> {
      const userEmail = email || currentUser.email;
      const id:string = deck._id ? deck._id : deck.OLID;
      const response = confirm(`You sure you want to delete ${deck.title}?`)
      if (response && type === 'savedDecks') {
          deleteSavedDeckByIdService(userEmail, id);
          let newDecks = decks.filter((sDeck) => sDeck._id !== deck._id);
          setDecks(newDecks);
      } else if(response && type === 'myDecks') {
          deleteDeckByIdService(userEmail, id);
          let newDecks = decks.filter((sDeck) => sDeck._id !== deck._id);
          setDecks(newDecks);
      }
  }

    const showDecks = () => {
      if (decks.length === 0) {
        return <div className="label">No Decks Available</div>
      } else {
        return decks.map((deck) => {
          return (
            <div key={deck._id}>
                {type !== 'byBook' && <button type="button" className="round-button" onClick={() => deleteHandler(deck)}>𝗫</button>}
                <Deck deck={deck} key={deck.title} type={type}/>
            </div>
          )
        })
      }
    }

    return (
      <div className="scroll">
          {showDecks()}
      </div>
    )
}

export default ListDecks;