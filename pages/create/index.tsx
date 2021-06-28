import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getDeckByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks';
import { NextRouter, useRouter } from 'next/router';
import HeaderButtons from '../../components/headerButtons';
import Link from 'next/link';

const MyDecks: React.FC = () => {
    const { currentUser, email } = useContext(AuthContext);
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
            <div className="page-container">
            {currentUser.uid ?
                <div>
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
        </div>
    )

}

export default MyDecks;