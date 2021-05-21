import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import IDeck from '../interfaces/IDeck'
import Container from './Container';

type Props = {
    deck: IDeck,
    decks: IDeck[],
    setDecks: Dispatch<SetStateAction<IDeck[]>>,
    type:String,
}

function Deck ({ deck, decks, setDecks, type }:Props) {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;
    const router = useRouter();



    const clickHandler = () => {
    if (type === "savedDecks") {
        router.push(`/deck/${deck._id}`);
    } else {
        router.push(`/deck/view/${deck._id}`)
    }
    }

    return (
        <div  onClick={clickHandler}>
            <img className="bookCover" src={deck.src}/>
            <div className="bookTitle">{deck.title}</div>
        </div>
    )
}

export default Deck