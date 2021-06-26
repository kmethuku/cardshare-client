import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';
import IDeck from '../interfaces/IDeck'

type Props = {
    deck: IDeck,
    type: String,
}

function Deck ({ deck, type }:Props) {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const router = useRouter();

    const clickHandler = () => {
        if (type === 'savedDecks') {
            router.push(`/study/${deck._id}`);
        } else {
            router.push(`/deck/${deck._id}`)
        }
    }

    return (
        <div className="small-book" onClick={clickHandler}>
            <img src={deck.src}/>
            {type === "byBook" && <div>{deck.creator}</div>}
        </div>
    )
}

export default Deck;