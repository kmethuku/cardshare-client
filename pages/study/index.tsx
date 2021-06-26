import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getSavedDecksByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks'
import Container from '../../components/Container';
import { useRouter } from 'next/router';
import HeaderButtons from '../../components/headerButtons';

function Study() {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;
    const router = useRouter();
    const [savedDecks, setSavedDecks] = useState<IDeck[]>([]);

    useEffect(() => {
        const sendEmail = email||currentUser.email
        if (sendEmail) {
            getSavedDecksByEmailService(sendEmail)
            .then((data) => {
                data && setSavedDecks(data[0].savedDecks)
            });
        };
    }, [router, currentUser, email]);

    return(
        <div>
            <HeaderButtons/>
            <div className="page-container">
                <h2 className="header">My Saved Decks</h2>
                <ListDecks decks={savedDecks} setDecks={setSavedDecks} type="savedDecks"/>
            </div>
        </div>
    )
}

export default Study;