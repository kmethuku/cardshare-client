import React from 'react';
import IDeck from '../interfaces/IDeck';
import Container from './Container';
import { CSVLink } from 'react-csv';

type Props = {
    deck: IDeck,
}

function ListFlashcards ({ deck }:Props) {
    const headers = [
        { label: "Question", key: "question" },
        { label: "Answer", key: "answer" }
    ];
    const csvReport = {
        data: deck.cards,
        headers: headers,
        filename: `${deck.title.split(' ').join('-')}.csv`
    };

    const showCards = () => {
        if (deck?.cards.length === 0) {
            return <div className="noDeckAnnouncement">No Flashcards Available</div>
        } else {
            return deck.cards.map((card) => {
                 return <div key={card._id}>
                    <p className="label">Question:</p>
                    <div>{card.question}</div>
                    <p className="label">Answer:</p>
                    <div>{card.answer}</div>
                </div>
            })
        }
    }

    return(
        <div>
            <div className="scroll">
                {showCards()}
            </div>
            <CSVLink {...csvReport}>Export as CSV</CSVLink>
        </div>
    )
}

export default ListFlashcards;