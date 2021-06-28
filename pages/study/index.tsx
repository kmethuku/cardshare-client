import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getSavedDecksByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks'
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';

const Study: React.FC = () => {
    const auth = useContext(AuthContext);
    if (!auth) return null;
    const { currentUser, email } = auth;
    const [savedDecks, setSavedDecks] = useState<IDeck[]>([]);

    useEffect(() => {
        const sendEmail = email || currentUser.email;
        if (sendEmail) {
            getSavedDecksByEmailService(sendEmail)
            .then((data) => setSavedDecks(data[0].savedDecks));
        };
    }, []);

    return(
        <div>
            <HeaderButtons/>
            {currentUser.uid ?
            <div className="page-container">
                <h2 className="header">My Saved Decks</h2>
                {savedDecks.length ?
                    <ListDecks decks={savedDecks} setDecks={setSavedDecks} type="savedDecks"/>
                    : <p className="label centered-container">None yet. Browse available decks <Link href='/discover'>here</Link>!</p>
                }
            </div> :
            <h2 className="header centered-container">You are not authorized to access this page. Please <Link href="/">log in</Link>.
            </h2>
            }
        </div>
    )
}

export default Study;