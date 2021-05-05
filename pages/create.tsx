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

    return (
      currentUser ? (
        <NewDeck setClickedItem={setClickedItem} />
      ) : (
        <h1>Access Unauthorized</h1>
      )
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
