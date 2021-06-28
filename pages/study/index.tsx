import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getSavedDecksByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks'
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';
import { IAuthContext } from '../../interfaces/IAuth';

const Study: React.FC = () => {
    const auth: IAuthContext | null = useContext(AuthContext);
    if (!auth) return null;
    const { currentUser, email } = auth;
    const [savedDecks, setSavedDecks] = useState<IDeck[]>([]);

    useEffect(() => {
        const sendEmail: string | null | undefined = email || currentUser.email;
        if (sendEmail) {
            getSavedDecksByEmailService(sendEmail)
                .then((data) => setSavedDecks(data[0].savedDecks))
                .catch((err) => alert('Sorry, an error occurred.'));
        };
    }, []);

    return(
        <div>
            <HeaderButtons/>
            <div className="page-container">
            {currentUser.uid ?
            <div>
                <h2 className="header">My Saved Decks</h2>
                {savedDecks.length ?
                    <ListDecks decks={savedDecks} setDecks={setSavedDecks} type="savedDecks"/>
                    : <p className="label center-text">None yet. Browse available decks <Link href='/discover'>here</Link>!</p>
                }
            </div> :
            <h2 className="header center-text">You are not authorized to access this page. Please <Link href="/">log in</Link>.
            </h2>
            }
            </div>
        </div>
    )
}

export default Study;