import React, { Dispatch, SetStateAction, useContext } from 'react';
import IDeck from '../interfaces/IDeck';
import { AuthContext } from '../contexts/AuthContext';
import Deck from './deck';
import { deleteSavedDeckByIdService, deleteDeckByIdService } from '../services/internalApi';
import { IAuthContext } from '../interfaces/IAuth';

type Props = {
    decks: IDeck[],
    setDecks: Dispatch<SetStateAction<IDeck[]>>,
    type: String,
}

const ListDecks: React.FC<Props> = ({ decks, setDecks, type }) => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const { currentUser, email } = auth;

  const deleteHandler = (deck: IDeck) => {
    const userEmail: string | null | undefined = email || currentUser.email;
    const id: string = deck._id ? deck._id : deck.OLID;
    const response: boolean = confirm(`Are you sure you want to delete ${deck.title}?`);
    if (response && type === 'savedDecks') {
        deleteSavedDeckByIdService(userEmail, id)
          .catch((err) => alert('Sorry, an error occurred.'));
        let newDecks: IDeck[] = decks.filter((singleDeck) => singleDeck._id !== deck._id);
        setDecks(newDecks);
    } else if (response && type === 'myDecks') {
        deleteDeckByIdService(userEmail, id)
          .catch((err) => alert('Sorry, an error occurred.'));
        let newDecks: IDeck[] = decks.filter((singleDeck) => singleDeck._id !== deck._id);
        setDecks(newDecks);
    }
  }

    return (
      <div className="scroll">
          {decks.map((deck) => {
            return (
              <div key={deck._id}>
                {type !== 'byBook' && <button type="button" className="round-button" onClick={() => deleteHandler(deck)}>x</button>}
                <Deck deck={deck} type={type}/>
              </div>
            )
          })}
      </div>
    )
}

export default ListDecks;