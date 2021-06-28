import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';

type Props = {
    deck: IDeck,
    type: String,
}

const Deck: React.FC<Props> =  ({ deck, type }) => {
    const router: NextRouter = useRouter();

    const clickHandler = () => {
        if (type === 'savedDecks') {
            router.push(`/study/${deck._id}`);
        } else {
            router.push(`/deck/${deck._id}`);
        }
    }

    return (
        <div className="small-book" onClick={clickHandler}>
            {deck.src ? <img
                src={deck.src}/> :
                <p className="bold-text">{deck.title.length > 30 ? deck.title.substring(0, 30).concat('...') : deck.title}</p>
            }
            {type === "byBook" && <div>
                <p className="label">Creator:</p>
                <div>{deck.creator}</div>
              </div>}
        </div>
    )
}

export default Deck;