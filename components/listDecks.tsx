import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import IDeck from '../interfaces/IDeck';
import { AuthContext } from '../contexts/AuthContext';
import Deck from './deck';
import { deleteSavedDeckByIdService, deleteDeckByIdService } from '../services/internalApi';
import { IAuthContext } from '../interfaces/IAuth';
import Loader from './loader';

type Props = {
    decks: IDeck[],
    setDecks: Dispatch<SetStateAction<IDeck[]>>,
    type: String,
}

const ListDecks: React.FC<Props> = ({ decks, setDecks, type }) => {
  const auth: IAuthContext | null = useContext(AuthContext);
  if (!auth) return null;
  const { currentUser, email } = auth;
  const [loading, setLoading] = useState<boolean>(false);

  const deleteHandler = (deck: IDeck) => {
    const userEmail: string | null | undefined = email || currentUser.email;
    const id: string = deck._id ? deck._id : deck.OLID;
    const response: boolean = confirm(`Are you sure you want to delete ${deck.title}?`);
    if (response && type === 'savedDecks') {
      setLoading(true);
      deleteSavedDeckByIdService(userEmail, id)
        .then(() => setLoading(false))
        .catch((err) => {
          setLoading(false);
          alert('Sorry, an error occurred.');
        });
      let newDecks: IDeck[] = decks.filter((singleDeck) => singleDeck._id !== deck._id);
      setDecks(newDecks);
    } else if (response && type === 'myDecks') {
        setLoading(true);
        deleteDeckByIdService(userEmail, id)
          .then(() => setLoading(false))
          .catch((err) => {
            setLoading(false);
            alert('Sorry, an error occurred.');
          });
        let newDecks: IDeck[] = decks.filter((singleDeck) => singleDeck._id !== deck._id);
        setDecks(newDecks);
    }
  }

  if (loading) return <Loader/>;
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