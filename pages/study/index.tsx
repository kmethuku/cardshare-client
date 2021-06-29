import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getSavedDecksByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks'
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';
import Loader from '../../components/loader';

const Study: React.FC = () => {
    const { currentUser, email } = useContext(AuthContext);
    const [savedDecks, setSavedDecks] = useState<IDeck[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const sendEmail: string | null | undefined = email || currentUser.email;
        if (sendEmail) {
            getSavedDecksByEmailService(sendEmail)
                .then((data) => setSavedDecks(data[0].savedDecks))
                .then(() => setLoading(false))
                .catch((err) => {
                    setLoading(false);
                    alert('Sorry, an error occurred.');
                });
        };
    }, []);

    if (loading) return <Loader/>;
    return (
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