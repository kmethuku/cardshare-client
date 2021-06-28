import React from 'react';
import { useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';

type Props = {
    deck: IDeck,
    type: String,
}

const Deck: React.FC<Props> =  ({ deck, type }) => {
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
            {deck.src ? <img
                src={deck.src}/> :
                <p className="label">{deck.title.length > 30 ? deck.title.substring(0, 30).concat('...') : deck.title}</p>
            }
            {type === "byBook" && <div>{deck.creator}</div>}
        </div>
    )
}

export default Deck;