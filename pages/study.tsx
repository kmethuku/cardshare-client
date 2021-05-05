import { AuthContext, useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import Flashcards from '../components/flashcards';
import { deleteSavedDeckByIdService, getSavedDecksByEmailService } from '../services/internalApi';
import IDeck from '../interfaces/IDeck'
import ListSavedDecks from '../components/listSavedDecks'
import { useRouter } from 'next/router';

function Study() {

const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;
    const router = useRouter();
    const [savedDecks, setSavedDecks] = useState<IDeck[]>([]);
    const [flashcards, setFlashcards] = useState<IDeck | null>(null);
    const [numDeleted, setNumDeleted] = useState<number>(0);

    useEffect(() => {
        const sendEmail = email||currentUser.email
        if (sendEmail) {
            getSavedDecksByEmailService(sendEmail)
            .then((data) => {
                data && setSavedDecks(data[0].savedDecks)
            });
        };
    },[currentUser, email, router]);

    return(
        <div>
            <ListSavedDecks savedDecks={savedDecks} setSavedDecks={setSavedDecks}/>
        </div>
    )

}

export default Study;