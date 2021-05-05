import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import IDeck from '../interfaces/IDeck'
import Container from './Container';
import { deleteSavedDeckByIdService} from '../services/internalApi'

type Props = {
    deck: IDeck,
    savedDecks: IDeck[],
    setSavedDecks: Dispatch<SetStateAction<IDeck[]>>,
}

function SavedDeck ({ deck, savedDecks, setSavedDecks }:Props) {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;
    const router = useRouter();



    const clickHandler = () => {
        router.push(`/deck/${deck._id}`);
    }

    return (
        <div  onClick={clickHandler}>
            <img className="bookCover" src={deck.src}/>
            <div className="bookTitle">{deck.title}</div>
        </div>
    )
}

export default SavedDeck