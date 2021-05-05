import { AuthContext, useAuth } from '../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { deleteSavedDeckByIdService, getSavedDecksByEmailService } from '../services/internalApi';
import IDeck from '../interfaces/IDeck'
import ListDecks from '../components/listDecks'
import { useRouter } from 'next/router';

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
    },[currentUser, email, router]);

    return(
        <div>
            <ListDecks decks={savedDecks} setDecks={setSavedDecks} type={"savedDecks"}/>
        </div>
    )

}

export default Study;