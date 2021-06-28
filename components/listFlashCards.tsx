import React from 'react';
import IDeck from '../interfaces/IDeck';
import { CSVLink } from 'react-csv';

type Props = {
    deck: IDeck,
}

const ListFlashcards: React.FC<Props> = ({ deck }) => {
    const headers = [
        { label: 'Question', key: 'question' },
        { label: 'Answer', key: 'answer' }
    ];
    const csvReport = {
        data: deck.cards,
        headers: headers,
        filename: `${deck.title.split(' ').join('-')}.csv`
    };

    return (
        <div>
            <div className="card-container">
                {deck.cards.map((card) => {
                 return (
                    <div key={card._id} className="flashcard-details__card-outer--spaced">
                        <div
                            className="flashcard-details__card-inner"
                        >
                            <div className="flashcard-details__card-front">
                                <p className="label">{card.question}</p>
                            </div>
                            <div className="flashcard-details__card-back">
                                <p className="label">{card.answer}</p>
                            </div>
                        </div>
                    </div>
                 )
            })}
            </div>
            <CSVLink {...csvReport}>Export as CSV</CSVLink>
        </div>
    )
}

export default ListFlashcards;