import { AuthContext } from '../../contexts/AuthContext';
import React, { useState, useEffect, useContext } from 'react';
import { getDeckByEmailService } from '../../services/internalApi';
import IDeck from '../../interfaces/IDeck';
import ListDecks from '../../components/listDecks';
import { useRouter } from 'next/router';
import HeaderButtons from '../../components/headerButtons';

function MyDecks() {
    const authorized = useContext(AuthContext);
    if (!authorized) return null;
    const { currentUser, email } = authorized;
    const router = useRouter();
    const [myDecks, setMyDecks] = useState<IDeck[]>([]);

    useEffect(() => {
        const sendEmail = email||currentUser.email
        if (sendEmail) {
            getDeckByEmailService(sendEmail)
            .then((data) => {
                console.log(data)
                data && setMyDecks(data)
            });
        };
    }, [currentUser, email, router]);

    const handleNewDeck = () => {
        router.push("/create/new");
    }

    return(
        <div>
            <HeaderButtons/>
            <div className="page-container">
                <h2 className="header">My Decks</h2>
                <button
                    type="button"
                    onClick={handleNewDeck}>
                    Create New Deck
                </button>
                <ListDecks decks={myDecks} setDecks={setMyDecks} type="myDecks"/>
            </div>
        </div>
    )

}

export default MyDecks;