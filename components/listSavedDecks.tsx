import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import Container from './Container';
import SavedDeck from './savedDeck'
import { deleteSavedDeckByIdService} from '../services/internalApi'

type Props = {
    savedDecks: IDeck[],
    setSavedDecks: Dispatch<SetStateAction<IDeck[]>>,
}
//{book.volumeInfo.imageLinks.thumbnail ||
function ListSavedDecks ({ savedDecks, setSavedDecks }:Props) {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;

    const showDecks = () => {
        if (savedDecks.length === 0) {
            return <div className="noDeckAnnouncement">No Saved Decks</div>
        } else {
            return savedDecks.map((deck) => {
                console.log(deck)
                 return <div className="bookDisplay" key={deck._id}>
                     <div className="deleteButton" onClick={() => deleteHandler(deck)}>𝗫</div>
                     <SavedDeck deck={deck} savedDecks={savedDecks} setSavedDecks={setSavedDecks} key={deck.title}/>
                </div>
            })
        }
    }

    const deleteHandler = (deck)=> {
        const sendEmail = email ||currentUser.email;
        const id:string = deck._id ? deck._id :deck.OLID;
        const response = confirm(`You sure you want to delete ${deck.title}?`)
        if (response) {
            deleteSavedDeckByIdService(sendEmail, id);
            let newSavedDecks = savedDecks.filter((sDeck) => sDeck._id !== deck._id);
            setSavedDecks(newSavedDecks);
        }
    }

    return(
        <Container>
            <div className="deckListing">
                {showDecks()}
            </div>
        </Container>
    )
}

export default ListSavedDecks;