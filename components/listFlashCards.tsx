import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import Container from './Container';
import Deck from './Deck'
import Card from'./Card'
import { deleteSavedDeckByIdService, deleteDeckByIdService } from '../services/internalApi'
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
                 return <div className="deckViewFlashcards" key={card._id}>
                    <div className="deckViewFlashcardsTitle">Question:</div>
                    <div className="deckViewFlashcardsContent">{card.question}</div>
                    <div className="deckViewFlashcardsTitle">Answer:</div>
                    <div className="deckViewFlashcardsContent">{card.answer}</div>
                </div>
            })
        }
    }

    return(
        <Container>
            <div className="deckListing">
                {showCards()}
            </div>
            <CSVLink {...csvReport}>Export as CSV</CSVLink>
        </Container>
    )
}

export default ListFlashcards;