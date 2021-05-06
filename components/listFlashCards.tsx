import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { useRouter } from 'next/router';
import IDeck from '../interfaces/IDeck';
import { AuthContext, useAuth } from '../contexts/AuthContext';
import Container from './Container';
import Deck from './Deck'
import Card from'./Card'
import { deleteSavedDeckByIdService, deleteDeckByIdService } from '../services/internalApi'

type Props = {
    deck: IDeck,
}

function ListFlashcards ({ deck}:Props) {

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
        </Container>
    )
}

export default ListFlashcards;