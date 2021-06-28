import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getDeckByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks';
import { NextRouter, useRouter } from 'next/router';
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';
import { IAuthContext } from '../../interfaces/IAuth';

const MyDecks: React.FC = () => {
    const auth: IAuthContext | null = useContext(AuthContext);
    if (!auth) return null;
    const { currentUser, email } = auth;
    const router: NextRouter = useRouter();
    const [myDecks, setMyDecks] = useState<IDeck[]>([]);

    useEffect(() => {
        getDeckByEmailService(email || currentUser.email)
            .then((data) => setMyDecks(data))
            .catch((err) => alert('Sorry, an error occurred.'));
    }, []);

    const handleNewDeck = () => {
        router.push('/create/new');
    }

    return(
        <div>
            <HeaderButtons/>
            {currentUser.uid ?
            <div className="page-container">
                <h2 className="header">My Decks</h2>
                <button
                    type="button"
                    onClick={handleNewDeck}>
                    Create New Deck
                </button>
                {myDecks.length ?
                    <ListDecks decks={myDecks} setDecks={setMyDecks} type="myDecks"/>
                    : <p className="label center-text">None yet. Create one!</p>
                }
            </div> :
            <h2 className="header center-text">You are not authorized to access this page. Please <Link href="/">log in</Link>.
            </h2>
            }
        </div>
    )

}

export default MyDecks;