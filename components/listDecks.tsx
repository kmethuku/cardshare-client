import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import Container from './Container';
import Deck from './Deck'
import { deleteSavedDeckByIdService, deleteDeckByIdService } from '../services/internalApi'

type Props = {
    decks: IDeck[],
    setDecks: Dispatch<SetStateAction<IDeck[]>>,
    type: String,
}
//{book.volumeInfo.imageLinks.thumbnail ||
function ListDecks ({ decks, setDecks, type }:Props) {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;

    const showDecks = () => {
        if (decks.length === 0) {
            return <div className="noDeckAnnouncement">No Decks Available</div>
        } else {
            return decks.map((deck) => {
                console.log(deck)
                 return <div className="bookDisplay" key={deck._id}>
                     <div className="deleteButton" onClick={() => deleteHandler(deck)}>𝗫</div>
                     <Deck deck={deck} decks={decks} setDecks={setDecks} key={deck.title} type={type}/>
                </div>
            })
        }
    }

    const deleteHandler = (deck:any)=> {
        const sendEmail = email ||currentUser.email;
        const id:string = deck._id ? deck._id :deck.OLID;
        const response = confirm(`You sure you want to delete ${deck.title}?`)
        if (response && type==="savedDecks") {
            deleteSavedDeckByIdService(sendEmail, id);
            let newDecks = decks.filter((sDeck) => sDeck._id !== deck._id);
            setDecks(newDecks);
        } else if(response && type==="myDecks") {
            deleteDeckByIdService(sendEmail, id);
            let newDecks = decks.filter((sDeck) => sDeck._id !== deck._id);
            setDecks(newDecks);
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

export default ListDecks;